import { defineStorage } from '@aws-amplify/backend'

/**
 * Oak IV Storage Configuration
 *
 * S3 bucket for storing:
 * - Public assets (logo, general images)
 * - Service images
 * - Article featured images
 * - Uploaded documents
 */
export const storage = defineStorage({
  name: 'oakivAssets',
  access: (allow) => ({
    // Public assets - readable by anyone
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // Service images
    'services/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // Article images
    'articles/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // Protected uploads (admin only)
    'protected/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
})
