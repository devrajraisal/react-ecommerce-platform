import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import catalogReducer from '../features/catalog/catalogSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'

export function createAppStore(preloadedState) {
  return configureStore({
    reducer: { cart: cartReducer, wishlist: wishlistReducer, catalog: catalogReducer },
    preloadedState,
  })
}
