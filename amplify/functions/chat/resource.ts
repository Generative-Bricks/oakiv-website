import { defineFunction } from '@aws-amplify/backend'

/**
 * Oak IV AI Wellness Assistant Lambda Function
 *
 * Integrates with Amazon Bedrock for AI-powered chat using Claude Sonnet
 * and Knowledge Bases for RAG (Retrieval Augmented Generation).
 *
 * Environment variables:
 * - KNOWLEDGE_BASE_ID: Set in Amplify Console after creating Bedrock Knowledge Base
 * - BEDROCK_MODEL_ID: Claude model to use for responses
 */
export const chatFunction = defineFunction({
  name: 'oakiv-chat-handler',
  entry: './handler.ts',
  runtime: 20, // Node.js 20.x
  timeoutSeconds: 30,
  memoryMB: 512,
  environment: {
    // Knowledge Base ID - set in Amplify Console environment variables
    // Leave empty for direct Bedrock model invocation without RAG
    KNOWLEDGE_BASE_ID: '',
    // Claude Sonnet model for responses
    BEDROCK_MODEL_ID: 'anthropic.claude-sonnet-4-20250514'
  }
})
