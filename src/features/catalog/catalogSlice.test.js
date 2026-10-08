import { describe, expect, it } from 'vitest'
import { createAppStore } from '../../app/store'
import { selectVisibleProducts, setCategory, setSearch, setSort } from './catalogSlice'

const visible = (store) => selectVisibleProducts(store.getState())

describe('catalog selectors', () => {
  it('shows every product by default', () => {
    expect(visible(createAppStore())).toHaveLength(12)
  })

  it('filters by category', () => {
    const store = createAppStore()
    store.dispatch(setCategory('sports'))
    expect(visible(store).map((p) => p.category)).toEqual(['sports', 'sports'])
  })

  it('searches by name without caring about case or spaces around the text', () => {
    const store = createAppStore()
    store.dispatch(setSearch('  WIRELESS '))
    expect(visible(store).map((p) => p.name)).toEqual(['Wireless ANC Headphones', 'Wireless Earbuds Pro'])
  })

  it('combines category and search', () => {
    const store = createAppStore()
    store.dispatch(setCategory('fashion'))
    store.dispatch(setSearch('wireless'))
    expect(visible(store)).toEqual([])
  })

  it('sorts by price and by rating', () => {
    const store = createAppStore()
    store.dispatch(setSort('price-asc'))
    const asc = visible(store).map((p) => p.price)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    store.dispatch(setSort('price-desc'))
    const desc = visible(store).map((p) => p.price)
    expect(desc).toEqual([...desc].sort((a, b) => b - a))
    store.dispatch(setSort('rating'))
    expect(visible(store)[0].name).toBe('Ceramic Pour-Over Set')
  })
})
