import { defineBackend } from '@aws-amplify/backend'
import { data } from './data/resource'
import { storage } from './storage/resource'

/**
 * Oak IV Hydration & Wellness - Amplify Backend
 *
 * This backend configuration defines:
 * - Data: DynamoDB tables for services, testimonials, articles
 * - Storage: S3 bucket for images and assets
 */
export const backend = defineBackend({
  data,
  storage
})
