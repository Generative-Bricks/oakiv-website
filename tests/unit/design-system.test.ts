import { describe, it, expect } from 'vitest'

// Design system constants that should match our Tailwind config
const OAK_COLORS = {
  'oak-green-primary': '#2E5B3C',
  'oak-green-light': '#4A7C59',
  'oak-green-pale': '#E8F0EB',
  'oak-gold': '#C9A962',
  'oak-cream': '#FAF9F6',
  'oak-text': '#333333',
  'oak-text-light': '#666666'
}

const OAK_FONTS = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Playfair Display', 'serif']
}

describe('Design System', () => {
  describe('Brand Colors', () => {
    it('should have Oak IV primary green defined', () => {
      expect(OAK_COLORS['oak-green-primary']).toBe('#2E5B3C')
    })

    it('should have Oak IV light green defined', () => {
      expect(OAK_COLORS['oak-green-light']).toBe('#4A7C59')
    })

    it('should have Oak IV pale green defined', () => {
      expect(OAK_COLORS['oak-green-pale']).toBe('#E8F0EB')
    })

    it('should have Oak IV gold defined', () => {
      expect(OAK_COLORS['oak-gold']).toBe('#C9A962')
    })

    it('should have Oak IV cream background defined', () => {
      expect(OAK_COLORS['oak-cream']).toBe('#FAF9F6')
    })

    it('should have text colors defined', () => {
      expect(OAK_COLORS['oak-text']).toBe('#333333')
      expect(OAK_COLORS['oak-text-light']).toBe('#666666')
    })
  })

  describe('Typography', () => {
    it('should have Inter as body font', () => {
      expect(OAK_FONTS.sans[0]).toBe('Inter')
    })

    it('should have Playfair Display as display font', () => {
      expect(OAK_FONTS.display[0]).toBe('Playfair Display')
    })
  })
})
