import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { storage } from './storage/resource'
import { chatFunction } from './functions/chat/resource'
import { PolicyStatement, Policy } from 'aws-cdk-lib/aws-iam'
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda'
import { Stack, Duration } from 'aws-cdk-lib'

/**
 * Oak IV Hydration & Wellness - Amplify Backend
 *
 * This backend configuration defines:
 * - Auth: Amazon Cognito for user authentication with Admin/Staff/Customer groups
 * - Data: DynamoDB tables for services, testimonials, articles, bookings
 * - Storage: S3 bucket for images and assets
 * - Functions: Lambda for AI Wellness Assistant (Bedrock integration)
 */
export const backend = defineBackend({
  auth,
  data,
  storage,
  chatFunction
})

// Get deployment region and account for least-privilege IAM
const lambdaFunction = backend.chatFunction.resources.lambda
const region = Stack.of(lambdaFunction).region
const accountId = Stack.of(lambdaFunction).account

// Grant Bedrock permissions - scoped to specific model and region
// Using Claude Sonnet for cost-effective, high-quality responses
lambdaFunction.addToRolePolicy(
  new PolicyStatement({
    actions: ['bedrock:InvokeModel'],
    resources: [
      `arn:aws:bedrock:${region}::foundation-model/anthropic.claude-sonnet-4-20250514`,
      `arn:aws:bedrock:${region}::foundation-model/anthropic.claude-3-5-sonnet*`
    ]
  })
)

// Knowledge Base permissions - scoped to this account and region
lambdaFunction.addToRolePolicy(
  new PolicyStatement({
    actions: ['bedrock:RetrieveAndGenerate', 'bedrock:Retrieve'],
    resources: [
      `arn:aws:bedrock:${region}:${accountId}:knowledge-base/*`
    ]
  })
)

// Create Function URL with IAM auth for security
// Frontend will use Amplify Auth to sign requests
const chatFunctionUrl = lambdaFunction.addFunctionUrl({
  authType: FunctionUrlAuthType.AWS_IAM,
  cors: {
    allowedOrigins: [
      'https://oakivhydration.com',
      'https://www.oakivhydration.com',
      'https://*.amplifyapp.com'
    ],
    allowedMethods: [HttpMethod.POST, HttpMethod.OPTIONS],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Amz-Security-Token'],
    maxAge: Duration.hours(1)
  }
})

// Grant authenticated users permission to invoke the function
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  new Policy(Stack.of(lambdaFunction), 'ChatFunctionInvokePolicy', {
    statements: [
      new PolicyStatement({
        actions: ['lambda:InvokeFunctionUrl'],
        resources: [lambdaFunction.functionArn]
      })
    ]
  })
)

// Add the function URL to outputs for frontend usage
backend.addOutput({
  custom: {
    chatFunctionUrl: chatFunctionUrl.url
  }
})
