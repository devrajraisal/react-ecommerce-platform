# ShopEase

A demo e-commerce storefront built with React, Redux Toolkit, and React Router. Browse a small catalog, search and filter it, open product pages, save items to a wishlist, and manage a cart with shipping and totals.

This is a front end portfolio project. There is no backend, no real payment, and no real inventory. The checkout button is disabled on purpose.

## Features

- Product catalog with category filters, text search, and sorting (featured, price, rating)
- Product detail pages with their own routes
- Cart with quantity controls, shipping calculation, and an order summary
- Free shipping above $50, shown with a hint of how much more to add
- Wishlist page for saved products
- Cart and wishlist are saved in the browser and restored on the next visit
- Not found pages for unknown routes and unknown products
- Accessible controls: labelled inputs, button states with `aria-pressed`, and reduced motion support

## Tech stack

- React 19 with function components
- Redux Toolkit and React Redux for state
- React Router (HashRouter)
- Vite, Vitest, Testing Library, and Oxlint
- Plain CSS

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/devrajraisal/react-ecommerce-platform.git
cd react-ecommerce-platform
npm install
npm run dev
```

Open the address that Vite prints.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run the linter |
| `npm test` | Run the unit and integration tests |

## Project structure

```
src/
  app/          Store setup and saving state to localStorage
  components/   Layout and product card
  data/         The demo product catalog
  features/     One folder per slice: cart, wishlist, catalog
  pages/        Shop, product, cart, wishlist, and not found pages
  utils/        Price and rating formatting
legacy/         The original single file HTML version
```

## Design decisions

- **Prices are stored in cents.** Money is kept as whole numbers, so sums such as 24.99 plus 4.99 never produce rounding errors. Values are only formatted as dollars when they are shown.
- **The cart stores ids and quantities only.** Prices and names are looked up from the catalog every time, so a cart can never show an outdated price.
- **Derived data uses selectors.** Visible products, cart lines, and totals are computed with memoized selectors, so components stay simple.
- **Saved data is validated.** Anything read from localStorage is checked before it is used, so corrupted or old data cannot break the cart.
- **HashRouter.** Routes use a hash so the app keeps working after a refresh on static hosts such as GitHub Pages.

## Tests

The tests cover the Redux slices and selectors (cart totals, shipping, quantity limits, filtering and sorting), the saved state logic, and the main user flows on screen: searching, adding to the cart, saving to the wishlist, and opening product pages.

```bash
npm test
```

## Notes

The product names, prices, and descriptions are sample data written for this demo.

## Original version

The first version of this project was a single HTML file. It is kept in the `legacy` folder for reference.

## License

MIT. See the `LICENSE` file.
