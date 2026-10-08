import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  FREE_SHIPPING_THRESHOLD, clearCart, removeItem, selectCartLines, selectCartTotals, setQuantity,
} from '../features/cart/cartSlice'
import { formatPrice } from '../utils/format'

export default function CartPage() {
  const dispatch = useDispatch()
  const lines = useSelector(selectCartLines)
  const { subtotal, shipping, total } = useSelector(selectCartTotals)

  if (lines.length === 0) {
    return (
      <section className="empty-page">
        <div aria-hidden="true" className="big-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <Link to="/" className="btn">Browse products</Link>
      </section>
    )
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <>
      <h1>Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {lines.map(({ product, qty, lineTotal }) => (
            <li key={product.id} className="cart-row">
              <span className="cart-icon" aria-hidden="true">{product.icon}</span>
              <div className="cart-info">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <span className="muted">{formatPrice(product.price)} each</span>
                <div className="qty">
                  <button type="button" aria-label={`Decrease quantity of ${product.name}`} onClick={() => dispatch(setQuantity({ id: product.id, qty: qty - 1 }))}>−</button>
                  <span aria-live="polite">{qty}</span>
                  <button type="button" aria-label={`Increase quantity of ${product.name}`} onClick={() => dispatch(setQuantity({ id: product.id, qty: qty + 1 }))}>+</button>
                </div>
              </div>
              <strong>{formatPrice(lineTotal)}</strong>
              <button type="button" className="remove" aria-label={`Remove ${product.name}`} onClick={() => dispatch(removeItem(product.id))}>🗑</button>
            </li>
          ))}
        </ul>

        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
          </dl>
          {remaining > 0 && <p className="muted small">Add {formatPrice(remaining)} more for free shipping.</p>}
          <button type="button" className="btn" disabled title="This is a demo store">Checkout (demo only)</button>
          <button type="button" className="btn btn-ghost" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </aside>
      </div>
    </>
  )
}
