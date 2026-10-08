import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getProductById } from '../../data/products'

export const FREE_SHIPPING_THRESHOLD = 5000 // cents
export const SHIPPING_FEE = 499 // cents
export const MAX_QTY = 99

const initialState = { items: [] } // [{ id, qty }]. Prices are always read from the catalog.

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload: id }) {
      const line = state.items.find((i) => i.id === id)
      if (!line) state.items.push({ id, qty: 1 })
      else line.qty = Math.min(line.qty + 1, MAX_QTY)
    },
    setQuantity(state, { payload: { id, qty } }) {
      const line = state.items.find((i) => i.id === id)
      if (!line) return
      if (qty <= 0) state.items = state.items.filter((i) => i.id !== id)
      else line.qty = Math.min(qty, MAX_QTY)
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id)
    },
    clearCart() {
      return initialState
    },
  },
})

export const { addItem, setQuantity, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer

const selectItems = (state) => state.cart.items

export const selectCartLines = createSelector([selectItems], (items) =>
  items
    .map(({ id, qty }) => {
      const product = getProductById(id)
      return product ? { product, qty, lineTotal: product.price * qty } : null
    })
    .filter(Boolean),
)

export const selectCartCount = createSelector([selectItems], (items) =>
  items.reduce((sum, i) => sum + i.qty, 0),
)

export const selectCartTotals = createSelector([selectCartLines], (lines) => {
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  return { subtotal, shipping, total: subtotal + shipping }
})

export const selectQuantityInCart = (state, id) =>
  state.cart.items.find((i) => i.id === id)?.qty ?? 0
