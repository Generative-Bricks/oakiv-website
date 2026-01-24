import type { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand
} from '@aws-sdk/client-bedrock-agent-runtime'
import {
  BedrockRuntimeClient,
  InvokeModelCommand
} from '@aws-sdk/client-bedrock-runtime'

const agentClient = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION })
const bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION })

const KNOWLEDGE_BASE_ID = process.env.KNOWLEDGE_BASE_ID
const MODEL_ID = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-sonnet-4-20250514'
const MODEL_ARN = `arn:aws:bedrock:${process.env.AWS_REGION}::foundation-model/${MODEL_ID}`

const SYSTEM_PROMPT = `You are the Oak IV Wellness Assistant, a friendly and knowledgeable guide for Oak IV Hydration & Wellness, a mobile IV therapy service in the Dallas-Fort Worth Metroplex.

CRITICAL SAFETY RULES - ALWAYS FOLLOW:
1. For ANY emergency medical situation, IMMEDIATELY respond: "If you're experiencing a medical emergency, please call 911 immediately. Do not wait for online assistance."
2. You are NOT a medical professional and cannot provide medical advice, diagnoses, or treatment recommendations
3. Always recommend consulting with healthcare providers for medical decisions
4. Never suggest specific dosages or treatment protocols

You CAN help with:
- Information about Oak IV services (IV therapy, vitamin injections, wellness consultations, event services)
- Explaining general benefits of hydration and wellness treatments
- Scheduling and booking questions
- Service area coverage (DFW Metroplex)
- Pricing and package information
- General wellness education and tips

You CANNOT help with:
- Medical diagnoses or treatment advice
- Drug interactions or medication questions
- Emergency medical situations (direct to 911)
- Services not offered by Oak IV
- Specific health conditions requiring medical expertise

Service Areas: Dallas, Fort Worth, Plano, Frisco, McKinney, Allen, Richardson, Garland, Irving, Arlington, and surrounding DFW communities.

Keep responses friendly, concise, and helpful. When discussing services, be informative but always recommend booking a consultation for personalized recommendations.`

// Emergency keywords that trigger immediate safety response
const EMERGENCY_KEYWORDS = [
  'emergency',
  'heart attack',
  'stroke',
  'can\'t breathe',
  'cannot breathe',
  'severe pain',
  'unconscious',
  'bleeding heavily',
  'chest pain',
  'overdose',
  'seizure',
  'anaphylaxis',
  'allergic reaction severe',
  'passing out',
  'fainted'
]

// Security constants
const MAX_MESSAGE_LENGTH = 2000
const ALLOWED_ORIGINS = [
  'https://oakivhydration.com',
  'https://www.oakivhydration.com'
]

interface ChatRequest {
  message: string
  sessionId?: string
}

interface ChatResponse {
  response: string
  sessionId?: string
  isEmergency?: boolean
  errorId?: string
}

function checkForEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return EMERGENCY_KEYWORDS.some(keyword => lowerMessage.includes(keyword))
}

function sanitizeMessage(message: string): string {
  // Remove control characters that could cause issues
  return message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
}

function getCorsOrigin(requestOrigin: string | undefined): string {
  if (requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)) {
    return requestOrigin
  }
  // Allow Amplify preview URLs
  if (requestOrigin && requestOrigin.includes('.amplifyapp.com')) {
    return requestOrigin
  }
  return ALLOWED_ORIGINS[0]
}

function createResponse(statusCode: number, body: ChatResponse, origin?: string): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': getCorsOrigin(origin),
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    },
    body: JSON.stringify(body)
  }
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return createResponse(200, { response: 'OK' }, origin)
  }

  try {
    const body: ChatRequest = JSON.parse(event.body || '{}')
    const { message, sessionId } = body

    // Input validation
    if (!message || typeof message !== 'string') {
      return createResponse(400, {
        response: 'Please provide a message to continue our conversation.'
      }, origin)
    }

    // Length validation
    if (message.length > MAX_MESSAGE_LENGTH) {
      return createResponse(400, {
        response: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`
      }, origin)
    }

    // Sanitize input
    const sanitizedMessage = sanitizeMessage(message.trim())

    // Check for emergency situations first
    if (checkForEmergency(sanitizedMessage)) {
      return createResponse(200, {
        response: `If you're experiencing a medical emergency, please call 911 immediately. Do not wait for online assistance.

Oak IV provides wellness services but cannot help with medical emergencies. Once you're safe and have received proper medical attention, we're here to support your recovery with our hydration and wellness services.

Is there anything else I can help you with regarding our wellness services?`,
        isEmergency: true,
        sessionId
      }, origin)
    }

    // Try RAG with Knowledge Base if configured
    if (KNOWLEDGE_BASE_ID) {
      try {
        const ragCommand = new RetrieveAndGenerateCommand({
          input: { text: sanitizedMessage },
          retrieveAndGenerateConfiguration: {
            type: 'KNOWLEDGE_BASE',
            knowledgeBaseConfiguration: {
              knowledgeBaseId: KNOWLEDGE_BASE_ID,
              modelArn: MODEL_ARN,
              generationConfiguration: {
                promptTemplate: {
                  textPromptTemplate: `${SYSTEM_PROMPT}

Context from Oak IV knowledge base:
$search_results$

User question: $query$

Provide a helpful, friendly response based on the context. If the context doesn't contain relevant information, use your general knowledge about IV therapy and wellness services while staying within the safety guidelines.`
                }
              },
              retrievalConfiguration: {
                vectorSearchConfiguration: {
                  numberOfResults: 5
                }
              }
            }
          },
          sessionId: sessionId || undefined
        })

        const ragResponse = await agentClient.send(ragCommand)

        return createResponse(200, {
          response: ragResponse.output?.text || 'I apologize, but I couldn\'t process that request. Please try again or contact Oak IV directly.',
          sessionId: ragResponse.sessionId
        }, origin)
      } catch (ragError) {
        // Log error type only, not full error (may contain user data)
        console.warn('RAG retrieval failed, falling back to direct model:', {
          errorType: ragError instanceof Error ? ragError.name : 'Unknown'
        })
        // Fall through to direct model invocation
      }
    }

    // Fallback to direct Bedrock model invocation
    const modelCommand = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: sanitizedMessage
          }
        ]
      })
    })

    const modelResponse = await bedrockClient.send(modelCommand)
    const responseBody = JSON.parse(new TextDecoder().decode(modelResponse.body))

    return createResponse(200, {
      response: responseBody.content?.[0]?.text || 'I apologize, but I couldn\'t generate a response. Please contact Oak IV directly at info@oakivhydration.com',
      sessionId
    }, origin)

  } catch (error) {
    // Generate error ID for tracking without exposing sensitive data
    const errorId = crypto.randomUUID()
    console.error('Chat handler error:', {
      errorId,
      errorType: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
      // Do not log: event.body, user messages
    })

    return createResponse(500, {
      response: 'I\'m having trouble connecting right now. Please try again in a moment, or contact Oak IV directly at info@oakivhydration.com or call (469) 555-1234.',
      errorId
    }, origin)
  }
}
