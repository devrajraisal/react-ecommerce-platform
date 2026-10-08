import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { createAppStore } from './app/store'
import { loadPersistedState, setupPersistence } from './app/persist'
import './index.css'

const store = createAppStore(loadPersistedState())
setupPersistence(store)

// HashRouter keeps routes working on static hosts such as GitHub Pages, even after a refresh.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
)
