import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

/**
 * Oak IV Data Schema
 *
 * Defines the data models for the Oak IV Hydration & Wellness application:
 * - Service: IV therapy, vitamin injections, wellness consultations, event services
 * - Testimonial: Customer reviews and feedback
 * - Article: Blog/educational content
 * - ContactSubmission: Contact form submissions
 * - BookingRequest: Service booking requests
 */
const schema = a.schema({
  // Service categories enum
  ServiceCategory: a.enum([
    'IV_THERAPY',
    'VITAMIN_INJECTION',
    'WELLNESS_CONSULTATION',
    'EVENT_SERVICE'
  ]),

  // Service model - represents wellness services offered
  Service: a.model({
    category: a.ref('ServiceCategory').required(),
    name: a.string().required(),
    slug: a.string().required(),
    shortDescription: a.string().required(),
    fullDescription: a.string().required(),
    price: a.float().required(),
    priceNote: a.string(),
    duration: a.string(),
    benefits: a.string().array().required(),
    ingredients: a.string().array(),
    image: a.string(),
    featured: a.boolean().default(false),
    sortOrder: a.integer().default(0),
    active: a.boolean().default(true)
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['read']),
    allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
  ]),

  // Testimonial model - customer reviews
  Testimonial: a.model({
    quote: a.string().required(),
    authorName: a.string().required(),
    authorLocation: a.string(),
    serviceReceived: a.string(),
    rating: a.integer(),
    featured: a.boolean().default(false),
    active: a.boolean().default(true)
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['read']),
    allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
  ]),

  // Article categories enum
  ArticleCategory: a.enum([
    'WELLNESS_TIPS',
    'IV_EDUCATION',
    'NUTRITION',
    'NEWS'
  ]),

  // Article status enum
  ArticleStatus: a.enum([
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
  ]),

  // Article model - blog/educational content
  Article: a.model({
    title: a.string().required(),
    slug: a.string().required(),
    excerpt: a.string().required(),
    content: a.string().required(),
    featuredImage: a.string(),
    category: a.ref('ArticleCategory'),
    tags: a.string().array(),
    author: a.string().required(),
    publishedAt: a.datetime(),
    status: a.ref('ArticleStatus')
  }).authorization(allow => [
    allow.guest().to(['read']),
    allow.authenticated().to(['read']),
    allow.groups(['Admin']).to(['create', 'update', 'delete', 'read'])
  ]),

  // Contact form submissions - with audit trail
  ContactSubmission: a.model({
    name: a.string().required(),
    email: a.email().required(),
    phone: a.phone(),
    service: a.string(),
    message: a.string().required(),
    preferredContact: a.enum(['EMAIL', 'PHONE']),
    status: a.enum(['NEW', 'READ', 'RESPONDED', 'ARCHIVED']),
    // Audit fields
    lastAccessedBy: a.string(),
    lastAccessedAt: a.datetime()
  }).authorization(allow => [
    allow.guest().to(['create']),
    allow.groups(['Admin', 'Staff']).to(['read', 'update'])
    // No delete - use ARCHIVED status for audit compliance
  ]),

  // Booking requests - owner-based access for HIPAA compliance
  BookingRequest: a.model({
    service: a.string().required(),
    preferredDate: a.date().required(),
    preferredTime: a.string().required(),
    name: a.string().required(),
    email: a.email().required(),
    phone: a.phone().required(),
    address: a.string(),
    notes: a.string(),
    status: a.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
    // Owner field for access control
    ownerEmail: a.string()
  }).authorization(allow => [
    allow.guest().to(['create']),
    // Owner can only read their own bookings (matched by ownerEmail)
    allow.ownerDefinedIn('ownerEmail').to(['read']),
    allow.groups(['Admin', 'Staff']).to(['create', 'update', 'read'])
    // No delete - use status for audit compliance
  ])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    // Use IAM for guest access (public read)
    defaultAuthorizationMode: 'iam',
    // Enable userPool for authenticated admin operations
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
})
