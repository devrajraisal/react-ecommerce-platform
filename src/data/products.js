// Demo catalog. Prices are stored in cents so totals never suffer from floating point errors.
export const CATEGORIES = [
  { id: 'electronics', label: 'Electronics', icon: '⚡' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'home', label: 'Home & Living', icon: '🏠' },
  { id: 'sports', label: 'Sports', icon: '🏃' },
]

export const products = [
  { id: 1, name: 'Wireless ANC Headphones', category: 'electronics', price: 8999, oldPrice: 12999, rating: 4.8, reviews: 234, icon: '🎧', badge: 'Sale', description: 'Over-ear headphones with active noise cancelling and a long battery life for travel and focus.' },
  { id: 2, name: 'Mechanical Keyboard RGB', category: 'electronics', price: 7499, oldPrice: null, rating: 4.6, reviews: 187, icon: '⌨️', badge: 'New', description: 'Hot-swappable mechanical keyboard with per-key RGB lighting and a compact layout.' },
  { id: 3, name: 'Slim Leather Wallet', category: 'fashion', price: 2499, oldPrice: 3999, rating: 4.5, reviews: 312, icon: '👛', badge: 'Sale', description: 'A thin wallet with room for cards and folded cash, made from soft full-grain leather.' },
  { id: 4, name: 'Running Shoes Pro', category: 'sports', price: 5999, oldPrice: 8999, rating: 4.7, reviews: 456, icon: '👟', badge: 'Hot', description: 'Lightweight running shoes with a cushioned sole and a breathable mesh upper.' },
  { id: 5, name: 'Ceramic Pour-Over Set', category: 'home', price: 3499, oldPrice: null, rating: 4.9, reviews: 89, icon: '☕', badge: 'Top Pick', description: 'A ceramic dripper and server that make a clean, slow-brewed cup of coffee at home.' },
  { id: 6, name: 'Smart Fitness Watch', category: 'electronics', price: 12999, oldPrice: 17999, rating: 4.4, reviews: 203, icon: '⌚', badge: 'Sale', description: 'Tracks heart rate, sleep, and workouts, with notifications on your wrist.' },
  { id: 7, name: 'Linen Summer Blazer', category: 'fashion', price: 6999, oldPrice: null, rating: 4.3, reviews: 145, icon: '🧥', badge: 'New', description: 'An unlined linen blazer that stays cool in warm weather and looks sharp when dressed up.' },
  { id: 8, name: 'Yoga Mat Premium', category: 'sports', price: 4299, oldPrice: 5499, rating: 4.8, reviews: 378, icon: '🧘', badge: 'Sale', description: 'A thick, non-slip mat that protects your joints during yoga and floor workouts.' },
  { id: 9, name: 'Table Lamp Minimalist', category: 'home', price: 5500, oldPrice: null, rating: 4.6, reviews: 92, icon: '💡', badge: null, description: 'A simple desk lamp with warm light and a dimmer, suited to reading and late work.' },
  { id: 10, name: 'Wireless Earbuds Pro', category: 'electronics', price: 4999, oldPrice: 7999, rating: 4.5, reviews: 521, icon: '🎵', badge: 'Sale', description: 'Compact earbuds with a charging case, clear calls, and a secure fit.' },
  { id: 11, name: 'Denim Jacket Classic', category: 'fashion', price: 7999, oldPrice: null, rating: 4.4, reviews: 167, icon: '👖', badge: null, description: 'A classic mid-weight denim jacket that layers well in every season.' },
  { id: 12, name: 'Portable Blender', category: 'home', price: 2999, oldPrice: 4499, rating: 4.7, reviews: 234, icon: '🥤', badge: 'Sale', description: 'A rechargeable single-serve blender for smoothies at home, work, or the gym.' },
]

const byId = new Map(products.map((p) => [p.id, p]))
export const getProductById = (id) => byId.get(Number(id))
export const getCategoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id
