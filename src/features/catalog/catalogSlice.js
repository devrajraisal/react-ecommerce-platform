import { createSelector, createSlice } from '@reduxjs/toolkit'
import { products } from '../../data/products'

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Sort: Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: { category: 'all', search: '', sort: 'featured' },
  reducers: {
    setCategory(state, { payload }) { state.category = payload },
    setSearch(state, { payload }) { state.search = payload },
    setSort(state, { payload }) { state.sort = payload },
  },
})

export const { setCategory, setSearch, setSort } = catalogSlice.actions
export default catalogSlice.reducer

export const selectCatalog = (state) => state.catalog

export const selectVisibleProducts = createSelector([selectCatalog], ({ category, search, sort }) => {
  const query = search.trim().toLowerCase()
  const list = products.filter(
    (p) => (category === 'all' || p.category === category) && (!query || p.name.toLowerCase().includes(query)),
  )
  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
  return list
})
