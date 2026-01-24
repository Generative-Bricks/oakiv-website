import { defineStorage } from '@aws-amplify/backend'

/**
 * Oak IV Storage Configuration
 *
 * S3 bucket for storing:
 * - Public assets (logo, general images)
 * - Service images
 * - Article featured images
 * - Uploaded documents
 * - Knowledge base documents for AI assistant
 *
 * Security features:
 * - Guest users can only read public content
 * - Admin group has full access to all paths
 * - Protected path requires authentication
 */
export const storage = defineStorage({
  name: 'oakivAssets',
  access: (allow) => ({
    // Public assets - readable by anyone, writable by admins
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['Admin']).to(['read', 'write', 'delete'])
    ],
    // Service images
    'services/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['Admin']).to(['read', 'write', 'delete'])
    ],
    // Article images
    'articles/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
      allow.groups(['Admin']).to(['read', 'write', 'delete'])
    ],
    // Knowledge base documents for AI (admin only)
    'knowledge-base/*': [
      allow.groups(['Admin']).to(['read', 'write', 'delete'])
    ],
    // Protected uploads (authenticated users)
    'protected/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ]
  })
})
