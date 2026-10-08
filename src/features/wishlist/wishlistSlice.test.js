import { describe, expect, it } from 'vitest'
import { createAppStore } from '../../app/store'
import { selectIsWished, toggleWishlist } from './wishlistSlice'

describe('wishlist slice', () => {
  it('toggles a product on and off', () => {
    const store = createAppStore()
    store.dispatch(toggleWishlist(4))
    expect(selectIsWished(store.getState(), 4)).toBe(true)
    store.dispatch(toggleWishlist(4))
    expect(selectIsWished(store.getState(), 4)).toBe(false)
  })
})
