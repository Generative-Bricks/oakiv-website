/**
 * Oak IV Hydration & Wellness - Type Definitions
 */

// Service categories
export type ServiceCategory =
  | 'iv-therapy'
  | 'vitamin-injection'
  | 'wellness-consultation'
  | 'event-service'

// Service status for Amplify
export type AmplifyServiceCategory =
  | 'IV_THERAPY'
  | 'VITAMIN_INJECTION'
  | 'WELLNESS_CONSULTATION'
  | 'EVENT_SERVICE'

/**
 * Service - represents a wellness service offered by Oak IV
 */
export interface Service {
  id: string
  category: ServiceCategory
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  price: number
  priceNote?: string
  duration?: string
  benefits: string[]
  ingredients?: string[]
  image?: string
  featured: boolean
  sortOrder: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Testimonial - customer review/feedback
 */
export interface Testimonial {
  id: string
  quote: string
  authorName: string
  authorLocation?: string
  serviceReceived?: string
  rating?: number
  featured: boolean
  active: boolean
  createdAt?: Date
}

/**
 * Article - blog/education content
 */
export type ArticleCategory =
  | 'wellness-tips'
  | 'iv-education'
  | 'nutrition'
  | 'news'

export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  category: ArticleCategory
  tags: string[]
  author: string
  publishedAt?: Date
  status: ArticleStatus
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Chat/AI Assistant types
 */
export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  timestamp: Date
  isEmergency?: boolean
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
  lastMessageAt: Date
}

/**
 * Contact form submission
 */
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  preferredContact?: 'email' | 'phone'
}

/**
 * Booking request
 */
export interface BookingRequest {
  id?: string
  service: string
  preferredDate: Date
  preferredTime: string
  name: string
  email: string
  phone: string
  address?: string
  notes?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

/**
 * Navigation link
 */
export interface NavLink {
  to: string
  label: string
  children?: NavLink[]
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

/**
 * Pagination
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
