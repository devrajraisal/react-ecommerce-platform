import { describe, expect, it } from 'vitest'
import { loadPersistedState, sanitize, setupPersistence } from './persist'
import { createAppStore } from './store'
import { addItem } from '../features/cart/cartSlice'
import { toggleWishlist } from '../features/wishlist/wishlistSlice'

const fakeStorage = (initial = {}) => {
  const data = { ...initial }
  return { getItem: (k) => data[k] ?? null, setItem: (k, v) => { data[k] = v }, data }
}

describe('persistence', () => {
  it('drops unknown products, bad quantities and duplicate wishlist ids', () => {
    const clean = sanitize({
      cart: { items: [{ id: 1, qty: 2 }, { id: 999, qty: 1 }, { id: 2, qty: -3 }, { id: 3, qty: 1.5 }, null] },
      wishlist: { ids: [1, 1, 999, 2] },
    })
    expect(clean.cart.items).toEqual([{ id: 1, qty: 2 }])
    expect(clean.wishlist.ids).toEqual([1, 2])
  })

  it('returns undefined for missing or corrupt data', () => {
    expect(loadPersistedState(fakeStorage())).toBeUndefined()
    expect(loadPersistedState(fakeStorage({ 'shopease:v1': '{not json' }))).toBeUndefined()
  })

  it('saves store changes and restores them', () => {
    const storage = fakeStorage()
    const store = createAppStore()
    setupPersistence(store, storage)
    store.dispatch(addItem(5))
    store.dispatch(toggleWishlist(7))
    const restored = loadPersistedState(storage)
    expect(restored.cart.items).toEqual([{ id: 5, qty: 1 }])
    expect(restored.wishlist.ids).toEqual([7])
  })
})
