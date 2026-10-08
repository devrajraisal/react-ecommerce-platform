import { describe, expect, it } from 'vitest'
import { formatPrice, stars } from './format'

describe('format helpers', () => {
  it('formats cents as dollars', () => {
    expect(formatPrice(8999)).toBe('$89.99')
    expect(formatPrice(5500)).toBe('$55.00')
    expect(formatPrice(0)).toBe('$0.00')
  })
  it('renders star ratings out of five', () => {
    expect(stars(4.8)).toBe('★★★★★')
    expect(stars(4.3)).toBe('★★★★☆')
  })
})
