import { describe, expect, it } from 'vitest'
import { createAppStore } from '../../app/store'
import {
  FREE_SHIPPING_THRESHOLD, SHIPPING_FEE, MAX_QTY, addItem, clearCart, removeItem,
  selectCartCount, selectCartLines, selectCartTotals, setQuantity,
} from './cartSlice'

const setup = () => createAppStore()

describe('cart slice', () => {
  it('adds a new item with quantity 1 and increments an existing one', () => {
    const store = setup()
    store.dispatch(addItem(1))
    store.dispatch(addItem(1))
    store.dispatch(addItem(2))
    expect(store.getState().cart.items).toEqual([{ id: 1, qty: 2 }, { id: 2, qty: 1 }])
    expect(selectCartCount(store.getState())).toBe(3)
  })

  it('removes an item when the quantity drops to zero', () => {
    const store = setup()
    store.dispatch(addItem(1))
    store.dispatch(setQuantity({ id: 1, qty: 0 }))
    expect(store.getState().cart.items).toEqual([])
  })

  it('caps the quantity and ignores unknown lines', () => {
    const store = setup()
    store.dispatch(addItem(1))
    store.dispatch(setQuantity({ id: 1, qty: 500 }))
    expect(store.getState().cart.items[0].qty).toBe(MAX_QTY)
    store.dispatch(setQuantity({ id: 99, qty: 3 }))
    expect(store.getState().cart.items).toHaveLength(1)
  })

  it('removes and clears items', () => {
    const store = setup()
    store.dispatch(addItem(1))
    store.dispatch(addItem(2))
    store.dispatch(removeItem(1))
    expect(store.getState().cart.items).toEqual([{ id: 2, qty: 1 }])
    store.dispatch(clearCart())
    expect(store.getState().cart.items).toEqual([])
  })

  it('reads prices from the catalog, so lines always use current prices', () => {
    const store = setup()
    store.dispatch(addItem(1))
    store.dispatch(setQuantity({ id: 1, qty: 2 }))
    const [line] = selectCartLines(store.getState())
    expect(line.lineTotal).toBe(8999 * 2)
  })

  it('charges shipping under the free shipping threshold', () => {
    const store = setup()
    store.dispatch(addItem(3)) // $24.99
    const totals = selectCartTotals(store.getState())
    expect(totals).toEqual({ subtotal: 2499, shipping: SHIPPING_FEE, total: 2499 + SHIPPING_FEE })
  })

  it('gives free shipping at or above the threshold', () => {
    const store = setup()
    store.dispatch(addItem(1)) // $89.99
    const totals = selectCartTotals(store.getState())
    expect(totals.subtotal).toBeGreaterThanOrEqual(FREE_SHIPPING_THRESHOLD)
    expect(totals.shipping).toBe(0)
  })

  it('has no shipping charge for an empty cart', () => {
    expect(selectCartTotals(setup().getState())).toEqual({ subtotal: 0, shipping: 0, total: 0 })
  })
})
