import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from './pages/CartPage'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import WishlistPage from './pages/WishlistPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Shop />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
