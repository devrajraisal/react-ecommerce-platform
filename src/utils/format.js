const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (cents) => money.format(cents / 100)

export function stars(rating) {
  const filled = Math.round(rating)
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
}
