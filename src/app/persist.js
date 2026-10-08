import { MAX_QTY } from '../features/cart/cartSlice'
import { getProductById } from '../data/products'

const KEY = 'shopease:v1'

// Saved data comes from the browser, so it is checked before it is trusted.
export function sanitize(raw) {
  const items = Array.isArray(raw?.cart?.items) ? raw.cart.items : []
  const ids = Array.isArray(raw?.wishlist?.ids) ? raw.wishlist.ids : []
  return {
    cart: {
      items: items
        .filter((i) => getProductById(i?.id) && Number.isInteger(i.qty) && i.qty > 0)
        .map((i) => ({ id: Number(i.id), qty: Math.min(i.qty, MAX_QTY) })),
    },
    wishlist: { ids: [...new Set(ids.filter((id) => getProductById(id)).map(Number))] },
  }
}

export function loadPersistedState(storage = window.localStorage) {
  try {
    const raw = storage.getItem(KEY)
    return raw ? sanitize(JSON.parse(raw)) : undefined
  } catch {
    return undefined
  }
}

export function setupPersistence(store, storage = window.localStorage) {
  return store.subscribe(() => {
    const { cart, wishlist } = store.getState()
    try {
      storage.setItem(KEY, JSON.stringify({ cart, wishlist }))
    } catch {
      // Storage can be blocked or full. The store still works in memory.
    }
  })
}
