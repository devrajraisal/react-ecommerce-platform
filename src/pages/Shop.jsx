import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { CATEGORIES } from '../data/products'
import {
  SORT_OPTIONS, selectCatalog, selectVisibleProducts, setCategory, setSearch, setSort,
} from '../features/catalog/catalogSlice'

export default function Shop() {
  const dispatch = useDispatch()
  const { category, search, sort } = useSelector(selectCatalog)
  const visible = useSelector(selectVisibleProducts)

  return (
    <>
      <section className="hero">
        <p className="hero-tag">✦ Free shipping on orders over $50</p>
        <h1>Shop <span>smarter</span>,<br />live better.</h1>
        <p>A small demo catalog across electronics, fashion, home, and sports.</p>
      </section>

      <div className="toolbar">
        <div className="filters" role="group" aria-label="Filter by category">
          <button type="button" className={`chip ${category === 'all' ? 'active' : ''}`} aria-pressed={category === 'all'} onClick={() => dispatch(setCategory('all'))}>
            All products
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" className={`chip ${category === c.id ? 'active' : ''}`} aria-pressed={category === c.id} onClick={() => dispatch(setCategory(c.id))}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <div className="controls">
          <input
            type="search"
            className="input"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <select className="input" aria-label="Sort products" value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      <p className="results" aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'product' : 'products'}</p>
      {visible.length === 0 ? (
        <p className="empty">No products match your search.</p>
      ) : (
        <div className="grid">{visible.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </>
  )
}
