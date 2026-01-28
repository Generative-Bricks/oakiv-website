import { describe, it, expect } from 'vitest'
import { isAfterHours, generateTimeSlots, calculateBookingTotal } from '@/utils'

describe('isAfterHours', () => {
  describe('regular hours (8am-7pm)', () => {
    it('returns false for 8:00 AM', () => {
      expect(isAfterHours('08:00')).toBe(false)
    })

    it('returns false for 12:00 PM', () => {
      expect(isAfterHours('12:00')).toBe(false)
    })

    it('returns false for 4:00 PM (16:00)', () => {
      expect(isAfterHours('16:00')).toBe(false)
    })

    it('returns false for 5:00 PM (17:00)', () => {
      expect(isAfterHours('17:00')).toBe(false)
    })

    it('returns false for 6:00 PM (18:00)', () => {
      expect(isAfterHours('18:00')).toBe(false)
    })
  })

  describe('after hours (7pm-9pm)', () => {
    it('returns true for 7:00 PM (19:00)', () => {
      expect(isAfterHours('19:00')).toBe(true)
    })

    it('returns true for 8:00 PM (20:00)', () => {
      expect(isAfterHours('20:00')).toBe(true)
    })

    it('returns true for 9:00 PM (21:00)', () => {
      expect(isAfterHours('21:00')).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('returns false for empty string', () => {
      expect(isAfterHours('')).toBe(false)
    })

    it('returns false for malformed time string', () => {
      expect(isAfterHours('invalid')).toBe(false)
    })

    it('returns false for time outside booking hours (22:00)', () => {
      expect(isAfterHours('22:00')).toBe(false)
    })

    it('returns false for time before opening (07:00)', () => {
      expect(isAfterHours('07:00')).toBe(false)
    })
  })
})

describe('generateTimeSlots', () => {
  it('generates exactly 14 slots (8am to 9pm inclusive)', () => {
    const slots = generateTimeSlots()
    expect(slots).toHaveLength(14)
  })

  it('generates slots from 8am to 9pm', () => {
    const slots = generateTimeSlots()
    expect(slots[0].value).toBe('08:00')
    expect(slots[slots.length - 1].value).toBe('21:00')
  })

  it('marks 9pm slot as after-hours', () => {
    const slots = generateTimeSlots()
    const ninepmSlot = slots.find(s => s.value === '21:00')
    expect(ninepmSlot?.isAfterHours).toBe(true)
  })

  it('includes +$25 in after-hours slot labels', () => {
    const slots = generateTimeSlots()
    const ninepmSlot = slots.find(s => s.value === '21:00')
    expect(ninepmSlot?.label).toContain('+$25')
  })
})

describe('calculateBookingTotal', () => {
  it('adds $25 fee for 9pm appointment', () => {
    const result = calculateBookingTotal(150, '21:00')
    expect(result.afterHoursFee).toBe(25)
    expect(result.total).toBe(175)
  })

  it('adds no fee for regular hours appointment', () => {
    const result = calculateBookingTotal(150, '10:00')
    expect(result.afterHoursFee).toBe(0)
    expect(result.total).toBe(150)
  })
})
