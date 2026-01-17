# Developer Guide - Chaitanya Kart

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Initial Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd chaitanya-kart

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173 (default Vite port)
```

### Build & Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to hosting service
# (Follow your hosting provider's documentation)
```

---

## Project Architecture Overview

### Technology Stack Explained

#### React 19

- **Why:** Modern UI library with hooks, JSX syntax
- **Usage:** Component-based architecture
- **File Extension:** `.jsx` for components

#### React Router v6

- **Why:** Client-side routing, no page reloads
- **Usage:** `<Routes>`, `<Route>`, `<Link>`, `useNavigate()`
- **Benefit:** SPA (Single Page Application) experience

#### Redux Toolkit

- **Why:** Predictable state management at scale
- **Usage:** Async thunks for API calls, slices for features
- **Benefit:** Centralized state, easier debugging

#### Bootstrap 5

- **Why:** Pre-built components, responsive design
- **Usage:** CSS classes for styling
- **Benefit:** Faster development, consistent UI

#### Vite

- **Why:** Lightning-fast build tool and dev server
- **Usage:** `npm run dev`, `npm run build`
- **Benefit:** Fast HMR (Hot Module Replacement), optimized builds

---

## Understanding the Data Flow

### User Adding Product to Cart

```
User clicks "Add to Cart" button
    ↓
ProductCard dispatches addToCart(product) action
    ↓
cartSlice updates state:
  - Checks if product exists
  - Updates quantity or adds new item
  - Recalculates totals
    ↓
Navbar component subscribes to cart.totalQuantity
    ↓
useSelector triggers re-render
    ↓
Badge shows updated count
```

### User Logging In

```
User submits login form
    ↓
Login component dispatches loginUser({ username, password })
    ↓
authSlice.loginUser async thunk:
  1. Calls API: POST /auth/login
  2. Receives JWT token
  3. Stores in localStorage
  4. Updates Redux state
    ↓
Result checked: if fulfilled, navigate to /dashboard
    ↓
Navbar re-renders showing username + logout button
```

### Fetching Products

```
Products page component mounts
    ↓
useEffect dispatches getProducts()
    ↓
productSlice state updates:
  - pending: loading = true
  - fulfilled: loading = false, items = data
  - rejected: loading = false, error = message
    ↓
Component re-renders with loading spinner
    ↓
When fulfilled, component renders product list
```

---

## Common Development Tasks

### Adding a New Page

1. **Create Component File**

```javascript
// src/pages/NewPage.jsx
/**
 * New Page Component (pages/NewPage.jsx)
 *
 * Page description and purpose
 */

function NewPage() {
  return (
    <div className="container py-5">
      <h1>New Page Title</h1>
      {/* Page content */}
    </div>
  );
}

export default NewPage;
```

2. **Add Route to App.jsx**

```javascript
import NewPage from "./pages/NewPage";

// Inside <Routes>:
<Route path="/newpage" element={<NewPage />} />;
```

3. **Add Navigation Link**

```javascript
// In Navbar.jsx or other pages:
<Link to="/newpage">New Page</Link>
```

### Fetching Data from API

1. **Add API Function** (if not exists)

```javascript
// src/api/fakeStoreApi.js
export const fetchNewData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoint`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch: " + error.message);
  }
};
```

2. **Create Redux Thunk**

```javascript
// src/store/slices/featureSlice.js
export const getNewData = createAsyncThunk(
  "feature/getNewData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchNewData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

3. **Use in Component**

```javascript
function ComponentName() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.feature);

  useEffect(() => {
    dispatch(getNewData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Adding Local State

```javascript
// Use useState for component-level state (not Redux)
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleToggle = () => setIsOpen(!isOpen);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <button onClick={handleToggle}>{isOpen ? "Close" : "Open"}</button>
      <select onChange={handleFilterChange} value={filter}>
        <option value="all">All</option>
        <option value="active">Active</option>
      </select>
    </div>
  );
}
```

### Styling Components

```javascript
// Option 1: Bootstrap classes
<button className="btn btn-primary btn-lg">Click Me</button>

// Option 2: CSS file
// MyComponent.css:
.custom-button {
  background-color: #ff0000;
  padding: 10px 20px;
}

// MyComponent.jsx:
import './MyComponent.css';
<button className="custom-button">Click Me</button>

// Option 3: Inline styles (use sparingly)
<button style={{ backgroundColor: 'red', padding: '10px' }}>
  Click Me
</button>
```

---

## Debugging Guide

### React DevTools

1. Install browser extension: React Developer Tools
2. Inspect components in browser DevTools
3. View props and state in real-time

### Redux DevTools

1. Install: Redux DevTools browser extension
2. View all dispatched actions
3. Time-travel debugging (undo/redo actions)
4. State snapshots

### Console Logging

```javascript
// Log Redux state
const state = useSelector((state) => state);
console.log("Full state:", state);

// Log specific slice
const products = useSelector((state) => state.products);
console.log("Products state:", products);

// Log before/after
console.log("Before:", oldValue);
console.log("After:", newValue);
```

### Network Debugging

1. Open DevTools Network tab (F12)
2. Filter by XHR (XMLHttpRequest)
3. Click request to see:
   - Request URL
   - Request headers
   - Request body
   - Response status
   - Response data

### Common Issues & Solutions

**Issue: Redux state not updating**

```javascript
// Check if action is being dispatched
console.log("Dispatching:", action);

// Check if reducer is handling action
console.log("State before:", state);
console.log("Action received:", action);
// (add logs in reducer)
```

**Issue: API call not working**

```javascript
// Check API URL
console.log("URL:", `${API_BASE_URL}/endpoint`);

// Check request/response
fetch(url)
  .then((r) => {
    console.log("Status:", r.status);
    return r.json();
  })
  .then((data) => {
    console.log("Response:", data);
  });
```

**Issue: Component not re-rendering**

```javascript
// Check if using selector correctly
const data = useSelector((state) => state.products.items);

// Check dependencies in useEffect
useEffect(() => {
  // code
}, [dependency]); // Make sure dependencies are correct
```

---

## API Integration Guide

### Available Endpoints

**Products:**

- `GET /products` - All products
- `GET /products/:id` - Single product
- `GET /products/categories` - All categories
- `GET /products/category/:name` - Products by category
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

**Users:**

- `GET /users` - All users
- `GET /users/:id` - Single user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

**Carts:**

- `GET /carts` - All carts
- `GET /carts/:id` - Single cart
- `GET /carts/user/:userId` - User's carts
- `POST /carts` - Create cart
- `PUT /carts/:id` - Update cart
- `DELETE /carts/:id` - Delete cart

**Auth:**

- `POST /auth/login` - Login with credentials
  ```
  Body: { "username": "user", "password": "pass" }
  Response: { "token": "jwt_token" }
  ```

### Making API Calls Outside of Redux

```javascript
// Direct fetch (use sparingly)
import { fetchProducts } from "../api/fakeStoreApi";

function Component() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

---

## Testing Strategies

### Manual Testing Checklist

- [ ] Test all routes are accessible
- [ ] Test product filtering by category
- [ ] Test add/remove from cart
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test logout functionality
- [ ] Test navigation on mobile (use DevTools)
- [ ] Test error handling (disconnect internet)
- [ ] Test form validations
- [ ] Test loading states appear

### Testing with Different Data

```javascript
// Mock successful API response
const mockProducts = [
  { id: 1, title: "Product 1", price: 100 },
  { id: 2, title: "Product 2", price: 200 },
];

// Test with empty data
const emptyProducts = [];

// Test with error state
const errorMessage = "Failed to fetch products";
```

---

## Performance Tips

### Optimization Checklist

- [ ] Use useCallback for event handlers passed to children
- [ ] Use useMemo for expensive computations
- [ ] Use useSelector to select only needed state
- [ ] Avoid creating objects/arrays in JSX
- [ ] Use key props correctly in lists
- [ ] Lazy load images (future enhancement)
- [ ] Code split with React.lazy() (future enhancement)
- [ ] Monitor with React Profiler

### Example Performance Optimization

```javascript
// Before - creates new array every render
function ProductList() {
  const allProducts = useSelector(s => s.products.items);
  const filtered = allProducts.filter(p => p.price < 100);
  return <div>{filtered.map(...)}</div>;
}

// After - memoize expensive calculation
function ProductList() {
  const filtered = useSelector(state => {
    const all = state.products.items;
    return all.filter(p => p.price < 100);
  });
  return <div>{filtered.map(...)}</div>;
}
```

---

## Deployment Checklist

### Before Deploying

- [ ] Review code for debugging logs (console.log)
- [ ] Update API_BASE_URL for production
- [ ] Test production build: `npm run build && npm run preview`
- [ ] Verify all routes work
- [ ] Verify authentication flow
- [ ] Check responsive design on mobile
- [ ] Test on different browsers
- [ ] Verify images load correctly
- [ ] Check SSL certificate (if applicable)
- [ ] Setup environment variables (if needed)

### Environment Variables

```javascript
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fakestoreapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

---

## Project Structure Best Practices

### What Goes Where

**src/api/**

- Only API client functions
- One file per API service
- No Redux or components

**src/store/**

- Redux slices only
- One slice per feature
- No API calls directly (use thunks)

**src/components/**

- Reusable UI components
- Navbar, buttons, cards
- Never page-specific

**src/pages/**

- Full page components
- One file per route
- Can combine multiple components

**src/**

- App.jsx (routes)
- main.jsx (entry point)
- index.css (global styles)
- App.css (app-level styles)

---

## Contributing Guidelines

### Code Review Process

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes
3. Commit with descriptive message: `git commit -m "Add feature description"`
4. Push to branch: `git push origin feature/feature-name`
5. Create Pull Request
6. Wait for review

### Commit Message Convention

```
[Feature] Description of what was added
[Fix] Description of what was fixed
[Docs] Documentation updates
[Style] Code style/formatting changes
[Refactor] Code refactoring without behavior change
[Performance] Performance improvements
```

Examples:

```
[Feature] Add product filtering by category
[Fix] Fix cart total calculation
[Docs] Update API documentation
```

---

## Useful Resources

### Documentation

- [React Docs](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [Bootstrap](https://getbootstrap.com)
- [Vite](https://vitejs.dev)

### Tools

- VS Code with ES7+ React/Redux/React-Native snippets
- Thunder Client or Postman (API testing)
- React DevTools (browser extension)
- Redux DevTools (browser extension)

### Learning

- Redux Fundamentals: https://redux.js.org/understanding/thinking-in-redux
- React Hooks: https://react.dev/reference/react
- Async Operations in Redux: https://redux-toolkit.js.org/api/createAsyncThunk

---

## Troubleshooting

### "npm install" fails

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Dev server won't start

```bash
# Check if port 5173 is in use
# Kill the process or change port in vite.config.js
lsof -i :5173
kill -9 <PID>

# Start again
npm run dev
```

### Build fails

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall and rebuild
npm install
npm run build
```

### API requests fail

- Check network tab in DevTools
- Verify API_BASE_URL is correct
- Check if API is accessible
- Look at response status code
- Check request/response headers

---

## Quick Reference

### Key Files

- Routes: `src/App.jsx`
- Redux Store: `src/store/index.js`
- API Functions: `src/api/fakeStoreApi.js`
- Main Entry: `src/main.jsx`
- Navigation: `src/components/Navbar.jsx`

### Key Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm install      # Install dependencies
```

### Key Imports

```javascript
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
```

---

## Support & Questions

For issues or questions:

1. Check the existing documentation
2. Review similar existing code
3. Check browser console for errors
4. Use DevTools to inspect state
5. Ask team lead or senior developer
