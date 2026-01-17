# Code Style Guide - Chaitanya Kart

## Purpose

This guide ensures consistent, maintainable, and professional code across the entire project.

---

## File Organization

### Component Files

```
src/components/
├── ComponentName.jsx      # Component code
└── ComponentName.css      # Component styles
```

### Page Files

```
src/pages/
├── PageName.jsx           # Page component
└── (optional) PageName.css
```

### API Files

```
src/api/
└── fakeStoreApi.js        # All API functions in one file
```

### Redux Files

```
src/store/
├── index.js               # Store configuration
└── slices/
    ├── domainSlice.js     # One slice per feature
    └── ...
```

---

## Naming Conventions

### Components

```javascript
// ✓ Correct - PascalCase
function ProductDetail() {}
function UserProfile() {}
const Navbar = () => {};

// ✗ Incorrect
function productDetail() {}
const user_profile = () => {};
```

### Variables & Functions

```javascript
// ✓ Correct - camelCase
const totalPrice = 100;
function calculateTax() {}
const handleClick = () => {};

// ✗ Incorrect
const total_price = 100;
function CalculateTax() {}
const HandleClick = () => {};
```

### Constants

```javascript
// ✓ Correct - UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ✗ Incorrect
const apiBaseUrl = "https://api.example.com";
const max_retries = 3;
```

### Redux

```javascript
// ✓ Correct
const getProducts = createAsyncThunk("products/getProducts", ...);
const productSlice = createSlice({ name: "products", ... });
export const { addToCart, removeFromCart } = cartSlice.actions;

// ✗ Incorrect
const GetProducts = createAsyncThunk(...);
const productReducer = createSlice(...);
```

---

## Comment Style

### JSDoc for Functions

```javascript
/**
 * Fetch all products from the API
 * @async
 * @returns {Promise<Array>} Array of product objects
 * @throws {Error} If API request fails
 * @example
 * const products = await fetchProducts();
 */
export const fetchProducts = async () => {
  // ...
};
```

### Inline Comments

```javascript
// Explain WHY, not WHAT
// ✓ Correct - explains purpose
// Clear the cart when order is placed
state.items = [];

// ✗ Incorrect - just describes code
// Set items to empty array
state.items = [];
```

### Block Comments for Sections

```javascript
// ============= PRODUCTS =============
// Functions for product management

export const fetchProducts = async () => {};
export const createProduct = async (product) => {};
```

### Component Comments

```javascript
/**
 * Product List Page Component (pages/Products.jsx)
 *
 * Displays all products with:
 * - Grid/list view toggle
 * - Category filtering
 * - Search functionality
 * - Add to cart buttons
 */
```

---

## Code Style

### Imports Organization

```javascript
// ✓ Correct - organized by type
// 1. React/libraries first
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// 2. Internal imports
import { addToCart } from "../store/slices/cartSlice";
import ProductCard from "../components/ProductCard";

// 3. Styles last
import "./Products.css";
```

### Component Structure

```javascript
/**
 * Component description
 */
import { ... } from '...';

/**
 * Component JSDoc (if needed)
 */
function MyComponent() {
  // 1. Hooks
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const data = useSelector(selector);

  // 2. Helper functions
  const handleClick = () => {};
  const calculateTotal = () => {};

  // 3. Effects (if any)
  useEffect(() => {}, []);

  // 4. Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
}

export default MyComponent;
```

### Redux Slice Structure

```javascript
/**
 * Feature Redux Slice (store/slices/featureSlice.js)
 *
 * Description of what this slice manages
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Async Thunks with comments
/**
 * Fetch data description
 */
export const fetchData = createAsyncThunk(...);

// 2. Slice creation
const featureSlice = createSlice({
  name: 'feature',
  initialState: { /* ... */ },
  reducers: {
    // Synchronous actions
  },
  extraReducers: (builder) => {
    // Async thunk handlers
  },
});

// 3. Exports
export const { action1, action2 } = featureSlice.actions;
export default featureSlice.reducer;
```

---

## React Best Practices

### Hooks Usage

```javascript
// ✓ Correct - hooks at top level
function Component() {
  const [state, setState] = useState();
  const dispatch = useDispatch();
  const selector = useSelector((s) => s.data);

  return <div>{state}</div>;
}

// ✗ Incorrect - conditional hook
function Component() {
  if (condition) {
    const [state, setState] = useState(); // ERROR!
  }
}
```

### Event Handlers

```javascript
// ✓ Correct - handle* prefix
const handleClick = () => {};
const handleSubmit = (e) => {
  e.preventDefault();
};
const handleChange = (e) => {};

// ✗ Incorrect
const onClick = () => {};
const onSubmit = (e) => {};
const onChange = (e) => {};
```

### Ternary Operator

```javascript
// ✓ Correct - simple conditions
const status = isLoading ? "Loading..." : "Done";
const render = condition ? <Component /> : null;

// ✗ Incorrect - nested ternaries are hard to read
const render = condition1 ? comp1 : condition2 ? comp2 : comp3;

// Better for complex conditions:
const render = condition1 ? (
  <Component1 />
) : condition2 ? (
  <Component2 />
) : (
  <Component3 />
);
```

### Conditional Rendering

```javascript
// ✓ Correct - logical AND for single condition
{
  isLoading && <Spinner />;
}
{
  data && <DataDisplay data={data} />;
}
{
  !error || <ErrorMessage error={error} />;
}

// ✓ Correct - ternary for if-else
{
  isAuthenticated ? <Dashboard /> : <Login />;
}

// ✗ Incorrect - avoid if-statements in JSX
{
  if (condition) {
    return <Component />;
  }
}
```

---

## Redux Best Practices

### Async Thunk Pattern

```javascript
// ✓ Correct - proper error handling
export const getItems = createAsyncThunk(
  "items/getItems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchItems();
      return data;
    } catch (error) {
      const message = error.message || "Failed to fetch";
      console.error("getItems error:", message);
      return rejectWithValue(message);
    }
  }
);
```

### State Structure

```javascript
// ✓ Correct - clear, normalized state
const initialState = {
  items: [], // Main data array
  selectedItem: null, // Single selected item
  loading: false, // Request status
  error: null, // Error message
};

// ✗ Incorrect - unclear structure
const initialState = {
  data: [],
  status: "idle", // Unclear values
  message: null,
};
```

### Action Handling

```javascript
// ✓ Correct - handle all states
builder
  .addCase(getItems.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(getItems.fulfilled, (state, action) => {
    state.loading = false;
    state.items = action.payload;
  })
  .addCase(getItems.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
```

---

## Common Patterns

### Loading & Error Display

```javascript
// Pattern for API data with loading/error states
function ProductList() {
  const { items, loading, error } = useSelector((state) => state.products);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!items.length) return <div>No products found</div>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Form Handling

```javascript
// Pattern for form submission
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      // Navigate or show success
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Conditional Styling

```javascript
// Pattern for conditional CSS classes
<button
  className={`btn ${isLoading ? "disabled" : "active"}`}
  disabled={isLoading}
>
  {isLoading ? "Saving..." : "Save"}
</button>
```

---

## Performance Guidelines

### useSelector Optimization

```javascript
// ✓ Correct - select only what's needed
const items = useSelector((state) => state.products.items);
const loading = useSelector((state) => state.products.loading);

// ✗ Incorrect - re-renders on any state change
const { items, loading, error } = useSelector((state) => state);
```

### useCallback for Functions

```javascript
// ✓ Use for event handlers passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ✓ Use for array/object in dependencies
const options = useMemo(() => ["a", "b", "c"], []);
```

### Key Props in Lists

```javascript
// ✓ Correct - unique, stable keys
{
  items.map((item) => <Item key={item.id} {...item} />);
}

// ✗ Incorrect - index as key (causes issues with sorting/filtering)
{
  items.map((item, index) => <Item key={index} {...item} />);
}
```

---

## Error Prevention

### PropTypes Checking

```javascript
// ✓ Add PropTypes (optional but recommended)
import PropTypes from "prop-types";

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.required,
    title: PropTypes.string.required,
    price: PropTypes.number.required,
  }).required,
  onAddToCart: PropTypes.func.required,
};
```

### Input Validation

```javascript
// ✓ Validate user input
const handleAddToCart = (quantity) => {
  if (!quantity || quantity < 1) {
    console.error("Invalid quantity");
    return;
  }
  dispatch(addToCart({ product, quantity }));
};
```

---

## Testing Practices

### Component Testing

```javascript
// Pattern for testing components
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("should render component", () => {
    render(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

---

## Code Review Checklist

- [ ] Follows naming conventions (PascalCase/camelCase)
- [ ] Has proper comments and JSDoc
- [ ] Handles loading/error states
- [ ] No console.errors in production code
- [ ] Proper Redux pattern usage
- [ ] Components are reasonably sized
- [ ] No hardcoded strings (magic strings)
- [ ] Error messages are user-friendly
- [ ] Performance optimizations considered
- [ ] Mobile responsive design applied
- [ ] No unused imports or variables

---

## Useful Links

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [React Router Documentation](https://reactrouter.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
