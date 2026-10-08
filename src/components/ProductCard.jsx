import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, selectQuantityInCart } from '../features/cart/cartSlice'
import { selectIsWished, toggleWishlist } from '../features/wishlist/wishlistSlice'
import { getCategoryLabel } from '../data/products'
import { formatPrice, stars } from '../utils/format'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wished = useSelector((state) => selectIsWished(state, product.id))
  const inCart = useSelector((state) => selectQuantityInCart(state, product.id))

  return (
    <article className="card">
      <div className="card-img">
        {product.badge && <span className={`badge ${product.oldPrice ? 'sale' : ''}`}>{product.badge}</span>}
        <button
          type="button"
          className="wish-btn"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={() => dispatch(toggleWishlist(product.id))}
        >
          {wished ? '❤️' : '🤍'}
        </button>
        <Link to={`/product/${product.id}`} aria-hidden="true" tabIndex={-1} className="card-icon">{product.icon}</Link>
      </div>
      <div className="card-body">
        <div className="card-cat">{getCategoryLabel(product.category)}</div>
        <h3 className="card-name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="rating" aria-label={`Rated ${product.rating} out of 5 from ${product.reviews} reviews`}>
          {stars(product.rating)} <span>({product.reviews})</span>
        </div>
        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="price-old">{formatPrice(product.oldPrice)}</span>}
        </div>
        <button type="button" className={`btn ${inCart ? 'btn-added' : ''}`} onClick={() => dispatch(addItem(product.id))}>
          {inCart ? `In cart (${inCart}). Add another` : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}
