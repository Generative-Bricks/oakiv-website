/**
 * Utility functions
 */

import { HOURS_CONFIG } from '@/constants/hours'

/**
 * Time slot with after-hours flag
 */
export interface TimeSlot {
  value: string
  label: string
  isAfterHours: boolean
}

/**
 * Check if a time string (HH:MM format) falls in after-hours (5pm-9pm)
 * Returns false for invalid or out-of-range times
 */
export function isAfterHours(time: string): boolean {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) {
    return false
  }
  const hour = parseInt(time.substring(0, 2), 10)
  return hour >= HOURS_CONFIG.REGULAR_CLOSE_HOUR && hour <= HOURS_CONFIG.AFTER_HOURS_CLOSE_HOUR
}

/**
 * Generate booking time slots from 8am to 9pm with after-hours flags
 */
export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = []

  for (let hour = HOURS_CONFIG.OPEN_HOUR; hour <= HOURS_CONFIG.AFTER_HOURS_CLOSE_HOUR; hour++) {
    const value = `${hour.toString().padStart(2, '0')}:00`
    const hour12 = hour % 12 || 12
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const afterHours = hour >= HOURS_CONFIG.REGULAR_CLOSE_HOUR

    let label = `${hour12}:00 ${ampm}`
    if (afterHours) {
      label += ` (+$${HOURS_CONFIG.AFTER_HOURS_FEE})`
    }

    slots.push({
      value,
      label,
      isAfterHours: afterHours,
    })
  }

  return slots
}

/**
 * Calculate booking total including after-hours fee if applicable
 */
export function calculateBookingTotal(
  basePrice: number,
  time: string
): { basePrice: number; afterHoursFee: number; total: number } {
  const afterHoursFee = isAfterHours(time) ? HOURS_CONFIG.AFTER_HOURS_FEE : 0
  return {
    basePrice,
    afterHoursFee,
    total: basePrice + afterHoursFee,
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d)
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return crypto.randomUUID()
}
