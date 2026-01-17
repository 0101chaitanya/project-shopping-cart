# Chaitanya Kart - Architecture & Code Documentation

## Project Overview

Chaitanya Kart is a full-featured e-commerce platform built with React, Redux, and Bootstrap. It demonstrates modern frontend architecture with API integration, state management, authentication, and responsive UI design.

**Technology Stack:**

- React 19 (latest)
- React Router v6 (client-side routing)
- Redux Toolkit (state management)
- React-Redux (Redux bindings)
- Bootstrap 5 (UI framework)
- Vite (build tool and dev server)
- FakeStoreAPI (backend)

---

## Project Structure

```
src/
├── api/
│   └── fakeStoreApi.js          # API client functions (23 functions)
├── components/
│   ├── Navbar.jsx               # Navigation bar (all pages)
│   └── Navbar.css               # Navbar styling
├── pages/
│   ├── Home.jsx                 # Landing page
│   ├── Login.jsx                # Authentication page
│   ├── Products.jsx             # Product listing
│   ├── ProductDetail.jsx        # Single product page
│   ├── Cart.jsx                 # Shopping cart management
│   ├── Dashboard.jsx            # Post-login dashboard
│   ├── Users.jsx                # Users listing
│   ├── UserDetail.jsx           # User profile page
│   ├── Carts.jsx                # Browse all carts
│   ├── CartDetail.jsx           # Single cart details
│   └── Features.jsx             # Feature showcase
├── store/
│   ├── index.js                 # Redux store configuration
│   └── slices/
│       ├── authSlice.js         # Authentication state
│       ├── cartSlice.js         # Shopping cart (local)
│       ├── cartsSlice.js        # Carts from API
│       ├── categoriesSlice.js   # Product categories
│       ├── productSlice.js      # Products data
│       └── usersSlice.js        # Users data
├── App.jsx                      # Main app component with routes
├── main.jsx                     # Application entry point
├── index.css                    # Global styles
└── App.css                      # App-level styles
```

---

## API Layer (src/api/fakeStoreApi.js)

### Purpose

Centralized module for all API interactions with FakeStoreAPI. Provides a clean interface for components and Redux slices.

### Configuration

```javascript
// Development: Uses Vite proxy at /api (configured in vite.config.js)
// Production: Uses direct FakeStoreAPI URL
const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://fakestoreapi.com";
```

### API Functions (23 Total)

#### Products (6 functions)

- `fetchProducts()` - Get all products
- `fetchProductById(id)` - Get single product
- `fetchCategories()` - Get category list
- `fetchProductsByCategory(category)` - Filter by category
- `createProduct(product)` - Create new product
- `updateProduct(id, product)` - Update product
- `deleteProduct(id)` - Delete product

#### Users (5 functions)

- `fetchUsers()` - Get all users
- `fetchUserById(id)` - Get single user
- `createUser(user)` - Create new user
- `updateUser(id, user)` - Update user
- `deleteUser(id)` - Delete user

#### Carts (5 functions)

- `fetchCarts()` - Get all carts
- `fetchCartById(id)` - Get single cart
- `fetchUserCarts(userId)` - Get user's carts
- `createCart(cart)` - Create new cart
- `updateCart(id, cart)` - Update cart
- `deleteCart(id)` - Delete cart

#### Authentication (2 functions)

- `loginUser(username, password)` - User login with credentials
  - Valid test credentials:
    - mor*2314 / 83r5^*
    - johnd / m38rmF$
    - kevinryan / kev02937@

### Error Handling

All functions include:

- Try-catch blocks
- Descriptive error messages
- Console logging for debugging
- Graceful error propagation

---

## Redux State Management (src/store/)

### Store Configuration (store/index.js)

Combines all slices into a single Redux store:

```javascript
const store = configureStore({
  reducer: {
    products: productReducer, // Products from API
    cart: cartReducer, // User's shopping cart
    auth: authReducer, // Authentication
    users: usersReducer, // Users from API
    categories: categoriesReducer, // Product categories
    carts: cartsReducer, // All carts from API
  },
});
```

### Redux Slices (store/slices/)

#### Products Slice (productSlice.js)

**State:**

- `items`: Array of all products
- `selectedProduct`: Currently viewed product
- `loading`: API request status
- `error`: Error message

**Async Thunks:**

- `getProducts()` - Fetch all products
- `getProductById(id)` - Fetch single product

#### Cart Slice (cartSlice.js)

**Note:** Manages user's personal shopping cart (client-side)

**State:**

- `items`: Cart items with quantities
- `totalQuantity`: Total item count
- `totalPrice`: Total cart value

**Actions:**

- `addToCart(product)` - Add/increment item
- `removeFromCart({ id })` - Remove item
- `updateQuantity({ id, quantity })` - Change quantity
- `clearCart()` - Empty cart

#### Carts Slice (cartsSlice.js)

**Note:** Manages all carts from API (for browsing)

**State:**

- `list`: All carts from API
- `selectedCart`: Currently viewed cart
- `userCarts`: Filtered carts by user
- `loading`: API request status
- `error`: Error message

**Async Thunks:**

- `getAllCarts()` - Fetch all carts
- `getCartById(id)` - Fetch single cart
- `getUserCarts(userId)` - Get user's carts

#### Users Slice (usersSlice.js)

**State:**

- `list`: All users
- `selectedUser`: Currently viewed user
- `loading`: API request status
- `error`: Error message

**Async Thunks:**

- `getUsers()` - Fetch all users
- `getUserById(id)` - Fetch single user

**Actions:**

- `clearSelectedUser()` - Clear selected user state

#### Categories Slice (categoriesSlice.js)

**State:**

- `list`: Product categories
- `loading`: API request status
- `error`: Error message

**Async Thunks:**

- `getCategories()` - Fetch all categories

#### Auth Slice (authSlice.js)

**State:**

- `user`: Logged-in username
- `token`: JWT authentication token
- `isAuthenticated`: Boolean auth status
- `loading`: API request status
- `error`: Error message

**Async Thunks:**

- `loginUser({ username, password })` - Authenticate user

**Actions:**

- `logout()` - Clear auth state
- `clearError()` - Clear error messages

**Storage:**

- JWT token stored in `localStorage`
- Username stored in `localStorage`
- Persists across page refreshes

---

## Component Architecture

### Main Components

#### App.jsx

**Purpose:** Root component with routing configuration

**Routes (11 total):**

1. `/` - Home page
2. `/features` - Feature showcase
3. `/products` - Product listing
4. `/products/:productId` - Product details
5. `/cart` - Shopping cart
6. `/login` - Login page
7. `/dashboard` - Post-login dashboard
8. `/users` - Users listing
9. `/users/:userId` - User details
10. `/carts` - Browse all carts
11. `/carts/:cartId` - Cart details

#### Navbar.jsx

**Purpose:** Navigation bar (appears on all pages)

**Features:**

- Sticky positioning (stays at top)
- Responsive design (hamburger menu on mobile)
- Shopping cart badge with item count
- Authentication status indicator
- Dropdown menu (Browse → Users/Carts)

**Conditional Rendering:**

- Login link (when not authenticated)
- Welcome message + Logout (when authenticated)

### Page Components

#### Home.jsx

- Landing page with welcome banner
- Feature highlights
- Call-to-action buttons

#### Login.jsx

- Username/password form
- Redux-integrated authentication
- Error messages display
- Loading state feedback
- Auto-redirect if authenticated
- Demo credentials reference

#### Products.jsx

- Product grid/list display
- Category filtering (dropdown)
- Product search
- Add to cart functionality
- Loading and error states

#### ProductDetail.jsx

- Single product information
- Full product description
- Add to cart button
- Related products

#### Cart.jsx

- Shopping cart items display
- Quantity management
- Remove items
- Price calculation
- Checkout button (UI)

#### Users.jsx

- Users listing table
- User profile links
- User information display

#### UserDetail.jsx

- User profile information
- User's carts display
- Address information

#### Carts.jsx

- All carts listing
- Cart details preview
- User filtering

#### CartDetail.jsx

- Individual cart details
- Cart items display
- User information

#### Dashboard.jsx

- Post-login welcome page
- Quick stats display

#### Features.jsx

- Detailed feature list
- Technical specifications
- Use case descriptions

---

## Authentication Flow

### Login Process

1. **User Input:** Username and password entered in Login.jsx
2. **Redux Action:** `loginUser()` thunk dispatched
3. **API Call:** Credentials sent to `/auth/login`
4. **Token Response:** JWT token returned by API
5. **Storage:** Token and username saved to localStorage
6. **State Update:** Redux auth state updated
7. **Redirect:** User navigated to `/dashboard`

### Logout Process

1. **Action Dispatch:** `logout()` action dispatched
2. **State Reset:** Auth state cleared
3. **Storage Clear:** localStorage cleared
4. **Redirect:** Navigate to home page

### Persistence

- Token stored in localStorage
- Checked on app initialization
- Auto-login if token exists
- Protected routes redirect to login if not authenticated

---

## Data Flow Patterns

### Async Data Fetching (Redux Pattern)

```
Component → useDispatch() → dispatch(asyncThunk())
→ API call → response → Redux slice updated
→ useSelector() → Component re-renders
```

### Example: Loading Products

```javascript
// 1. Component dispatches action
dispatch(getProducts());

// 2. Thunk executes (pending state)
state.loading = true;

// 3. API call completes (fulfilled state)
state.items = response.data;
state.loading = false;

// 4. Component receives updated state
const { items, loading } = useSelector((state) => state.products);
```

### Shopping Cart Operations

```javascript
// Local state update (no API call)
dispatch(addToCart(product)) → cartSlice updates immediately
```

---

## Styling Approach

### Bootstrap Framework

- Utility classes for responsive design
- Pre-built components (navbar, buttons, forms)
- Breakpoints for mobile/tablet/desktop

### CSS Files

- `index.css` - Global styles
- `App.css` - App-level styles
- `Navbar.css` - Navbar-specific styles

### Responsive Design

- Mobile-first approach
- Bootstrap's grid system (col-md-_, col-lg-_)
- Hamburger menu on small screens
- Flexbox layouts

---

## Development Tools

### Vite Configuration

**Dev Server:**

- Proxy: `/api` → `https://fakestoreapi.com`
- Hot Module Replacement (HMR)
- Fast build times

**Production Build:**

- Optimized bundle
- Direct API calls (no proxy)

### ESLint Configuration

- Code quality checks
- Consistent code style
- Error prevention

---

## Error Handling Strategy

### API Level

- Try-catch in every API function
- Console logging for debugging
- Descriptive error messages

### Redux Level

- `rejectWithValue()` for error propagation
- Error stored in state
- Handling of pending/fulfilled/rejected states

### Component Level

- Display error messages to users
- Loading spinners during requests
- Retry buttons for failed operations

---

## Testing Credentials

**Valid FakeStoreAPI Users:**

- Username: `mor_2314`, Password: `83r5^_`
- Username: `johnd`, Password: `m38rmF$`
- Username: `kevinryan`, Password: `kev02937@`

---

## Performance Optimizations

1. **Code Splitting:** React Router lazy loading
2. **State Normalization:** Redux slices organized by domain
3. **Memoization:** useSelector for component optimization
4. **Bootstrap CDN:** Efficient CSS delivery

---

## Future Enhancement Opportunities

1. **Shopping Features:**
   - Real checkout process
   - Order history
   - Wishlist functionality

2. **User Features:**
   - User registration
   - Profile customization
   - Order tracking

3. **Admin Features:**
   - Product management
   - User management
   - Analytics dashboard

4. **Performance:**
   - Image lazy loading
   - Pagination for large lists
   - Search optimization

---

## Key Files Reference

| File                        | Purpose         | Lines       |
| --------------------------- | --------------- | ----------- |
| `src/main.jsx`              | Entry point     | ~20         |
| `src/App.jsx`               | Root router     | ~40         |
| `src/api/fakeStoreApi.js`   | API client      | ~310        |
| `src/store/index.js`        | Redux config    | ~20         |
| `src/store/slices/*.js`     | Redux slices    | 60-100 each |
| `src/components/Navbar.jsx` | Navigation      | ~100        |
| `src/pages/*.jsx`           | Page components | 50-150 each |

---

## Conventions & Best Practices

1. **Naming:**
   - Components: PascalCase (e.g., `Navbar`, `ProductList`)
   - Functions: camelCase (e.g., `fetchProducts`, `handleClick`)
   - Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

2. **File Organization:**
   - One component per file
   - Related styles in same directory
   - API functions grouped by domain

3. **Redux:**
   - Async thunks for API calls
   - Slices organized by feature
   - Always handle loading/error states

4. **Comments:**
   - JSDoc for functions
   - Inline comments for complex logic
   - Block comments for sections

---

## Deployment Checklist

- [ ] Update `API_BASE_URL` for production
- [ ] Build optimized bundle: `npm run build`
- [ ] Test production build locally
- [ ] Deploy to hosting service
- [ ] Verify API connectivity
- [ ] Test all routes
- [ ] Verify authentication flow
- [ ] Check responsive design
- [ ] Monitor console for errors
