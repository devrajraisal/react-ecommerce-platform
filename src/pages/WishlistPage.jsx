import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProductById } from '../data/products'
import { selectWishlistIds } from '../features/wishlist/wishlistSlice'

export default function WishlistPage() {
  const items = useSelector(selectWishlistIds).map(getProductById).filter(Boolean)

  if (items.length === 0) {
    return (
      <section className="empty-page">
        <div aria-hidden="true" className="big-icon">🤍</div>
        <h1>Your wishlist is empty</h1>
        <p className="muted">Tap the heart on any product to save it here.</p>
        <Link to="/" className="btn">Browse products</Link>
      </section>
    )
  }

  return (
    <>
      <h1>Your wishlist</h1>
      <div className="grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </>
  )
}
