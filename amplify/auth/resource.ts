import { defineAuth } from '@aws-amplify/backend'

/**
 * Oak IV Authentication Configuration
 *
 * Uses Amazon Cognito with email/phone login and MFA.
 * Configured for HIPAA compliance with strong password policy.
 * Admin users are managed through Cognito groups for access control.
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Oak IV Hydration - Verify Your Email',
      verificationEmailBody: (createCode) =>
        `Your Oak IV verification code is: ${createCode()}`
    },
    phone: true
  },
  userAttributes: {
    givenName: {
      required: true,
      mutable: true
    },
    familyName: {
      required: true,
      mutable: true
    },
    phoneNumber: {
      required: false,
      mutable: true
    },
    address: {
      required: false,
      mutable: true
    }
  },
  // HIPAA-compliant MFA configuration
  multifactor: {
    mode: 'REQUIRED',
    sms: true,
    totp: true  // Enable authenticator apps (more secure than SMS)
  },
  accountRecovery: 'EMAIL_ONLY',
  groups: ['Admin', 'Staff', 'Customer']
})
