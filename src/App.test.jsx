// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { createAppStore } from './app/store'

afterEach(cleanup)

function renderApp(route = '/') {
  const store = createAppStore()
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>,
  )
  return userEvent.setup()
}

describe('ShopEase app', () => {
  it('filters products with the search box', async () => {
    const user = renderApp()
    expect(screen.getByText('Showing 12 products')).toBeTruthy()
    await user.type(screen.getByLabelText('Search products'), 'lamp')
    expect(screen.getByText('Showing 1 product')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Table Lamp Minimalist' })).toBeTruthy()
  })

  it('shows an empty message when nothing matches', async () => {
    const user = renderApp()
    await user.type(screen.getByLabelText('Search products'), 'zzzz')
    expect(screen.getByText('No products match your search.')).toBeTruthy()
  })

  it('adds a product to the cart and shows the total with shipping', async () => {
    const user = renderApp()
    const card = screen.getByRole('heading', { name: 'Slim Leather Wallet' }).closest('article')
    await user.click(within(card).getByRole('button', { name: 'Add to cart' }))
    await user.click(screen.getByRole('link', { name: /Cart/ }))
    expect(screen.getByRole('heading', { name: 'Your cart' })).toBeTruthy()
    const summary = screen.getByLabelText('Order summary')
    expect(within(summary).getByText('$24.99')).toBeTruthy() // subtotal
    expect(within(summary).getByText('$4.99')).toBeTruthy() // shipping
    expect(within(summary).getByText('$29.98')).toBeTruthy() // total
  })

  it('saves a product to the wishlist', async () => {
    const user = renderApp()
    await user.click(screen.getByRole('button', { name: 'Add Yoga Mat Premium to wishlist' }))
    await user.click(screen.getByRole('link', { name: /Wishlist/ }))
    expect(screen.getByRole('heading', { name: 'Your wishlist' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Yoga Mat Premium' })).toBeTruthy()
  })

  it('shows a product page and a not found page for unknown ids', () => {
    renderApp('/product/5')
    expect(screen.getByRole('heading', { name: 'Ceramic Pour-Over Set' })).toBeTruthy()
    cleanup()
    renderApp('/product/999')
    expect(screen.getByText('That product does not exist.')).toBeTruthy()
  })
})
