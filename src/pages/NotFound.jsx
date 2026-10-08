import { Link } from 'react-router-dom'

export default function NotFound({ message = 'This page does not exist.' }) {
  return (
    <section className="empty-page">
      <h1>404</h1>
      <p className="muted">{message}</p>
      <Link to="/" className="btn">Back to shop</Link>
    </section>
  )
}
