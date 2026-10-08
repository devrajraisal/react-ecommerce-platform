import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addItem, selectQuantityInCart } from '../features/cart/cartSlice'
import { selectIsWished, toggleWishlist } from '../features/wishlist/wishlistSlice'
import { getCategoryLabel, getProductById } from '../data/products'
import { formatPrice, stars } from '../utils/format'
import NotFound from './NotFound'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const dispatch = useDispatch()
  const wished = useSelector((state) => (product ? selectIsWished(state, product.id) : false))
  const inCart = useSelector((state) => (product ? selectQuantityInCart(state, product.id) : 0))

  if (!product) return <NotFound message="That product does not exist." />

  return (
    <article className="detail">
      <Link to="/" className="back">← Back to shop</Link>
      <div className="detail-grid">
        <div className="detail-img" aria-hidden="true">{product.icon}</div>
        <div>
          <div className="card-cat">{getCategoryLabel(product.category)}</div>
          <h1>{product.name}</h1>
          <div className="rating" aria-label={`Rated ${product.rating} out of 5 from ${product.reviews} reviews`}>
            {stars(product.rating)} <span>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className="price-row big">
            <span className="price">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="price-old">{formatPrice(product.oldPrice)}</span>}
          </div>
          <p className="muted">{product.description}</p>
          <div className="actions">
            <button type="button" className="btn" onClick={() => dispatch(addItem(product.id))}>
              {inCart ? `Add another (${inCart} in cart)` : 'Add to cart'}
            </button>
            <button type="button" className="btn btn-ghost" aria-pressed={wished} onClick={() => dispatch(toggleWishlist(product.id))}>
              {wished ? '❤️ Saved' : '🤍 Save for later'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
