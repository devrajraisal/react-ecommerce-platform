import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { selectCartCount } from '../features/cart/cartSlice'
import { selectWishlistIds } from '../features/wishlist/wishlistSlice'

export default function Layout() {
  const cartCount = useSelector(selectCartCount)
  const wishCount = useSelector(selectWishlistIds).length

  return (
    <>
      <header className="nav">
        <NavLink to="/" className="logo">ShopEase</NavLink>
        <nav aria-label="Main">
          <NavLink to="/" end>Shop</NavLink>
          <NavLink to="/wishlist">Wishlist <span className="count" aria-label={`${wishCount} saved`}>{wishCount}</span></NavLink>
          <NavLink to="/cart">Cart <span className="count" aria-label={`${cartCount} items`}>{cartCount}</span></NavLink>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="footer">
        ShopEase is a portfolio demo. There are no real payments, orders, or shipments.
      </footer>
    </>
  )
}
