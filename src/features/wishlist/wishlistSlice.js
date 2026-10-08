import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] },
  reducers: {
    toggleWishlist(state, { payload: id }) {
      state.ids = state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id]
    },
  },
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer

export const selectWishlistIds = (state) => state.wishlist.ids
export const selectIsWished = (state, id) => state.wishlist.ids.includes(id)
