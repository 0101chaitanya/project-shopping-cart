/**
 * Application Entry Point (main.jsx)
 * 
 * Bootstraps the React application with:
 * - Bootstrap CSS and JavaScript for styling and interactive components
 * - Redux store provider for global state management
 * - React StrictMode for development error detection
 * - Root React DOM rendering
 * 
 * Order of imports is important:
 * 1. Bootstrap CSS (styles)
 * 2. Bootstrap JS (interactive components)
 * 3. React dependencies
 * 4. Redux store provider
 * 5. Application stylesheets
 * 6. Redux store setup
 */

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'

/**
 * Render the React application
 * Wraps App with Redux Provider to make store available to all components
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
