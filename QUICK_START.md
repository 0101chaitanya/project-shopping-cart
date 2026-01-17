# 🚀 Quick Start Guide - Chaitanya Kart

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Navigation Map

```
HOME (/)
├── Features (/features)
│   └── 6 Feature Cards
│       └── Links to respective pages
├── Products (/products)
│   ├── Product Grid
│   └── Product Detail (/products/:id)
│       └── Add to Cart, View Details
├── Browse Dropdown
│   ├── Users (/users)
│   │   └── User Detail (/users/:id)
│   └── All Carts (/carts)
│       └── Cart Detail (/carts/:id)
├── Cart (/cart)
│   └── Shopping Cart Management
├── Login (/login)
│   └── Dashboard (/dashboard) [if authenticated]
```

## 🎯 Main Routes

| Page           | URL             | Purpose                  |
| -------------- | --------------- | ------------------------ |
| Home           | `/`             | Welcome & introduction   |
| Features       | `/features`     | API features showcase    |
| Products       | `/products`     | Browse all products      |
| Product Detail | `/products/:id` | View product details     |
| Users          | `/users`        | List all users           |
| User Detail    | `/users/:id`    | View user profile        |
| Carts          | `/carts`        | View all carts           |
| Cart Detail    | `/carts/:id`    | View cart contents       |
| Shopping Cart  | `/cart`         | Personal cart management |
| Login          | `/login`        | User authentication      |
| Dashboard      | `/dashboard`    | User profile (protected) |

## 🔑 Test Credentials

```
Username: mor_2314
Password: 83r%^_
```

## 📦 Key Features by Section

### Products Section

- ✅ List all products (20+)
- ✅ Filter by category
- ✅ View product details
- ✅ See ratings & reviews
- ✅ Add to cart

### Users Section

- ✅ Browse all users
- ✅ View user profiles
- ✅ See contact info
- ✅ View addresses
- ✅ Company details

### Carts Section

- ✅ View all carts
- ✅ See cart contents
- ✅ Track quantities
- ✅ Link to users
- ✅ Link to products

### Authentication

- ✅ Login with credentials
- ✅ JWT token management
- ✅ User dashboard
- ✅ Logout functionality
- ✅ Session persistence

### Shopping Cart

- ✅ Add products
- ✅ Update quantities
- ✅ Remove items
- ✅ Cart totals
- ✅ Clear cart

## 🎨 Navbar Features

```
Chaitanya Kart (Logo)
├── Features Link
├── Products Link
├── Browse Dropdown
│   ├── Users
│   └── All Carts
├── Cart Badge (shows count)
├── If Logged In:
│   ├── Welcome Message
│   └── Logout Button
└── If Not Logged In:
    └── Login Link
```

## 💾 Redux State Structure

```javascript
store: {
  products: {
    items: [],
    selectedProduct: {},
    loading: false,
    error: null
  },
  users: {
    list: [],
    selectedUser: {},
    loading: false,
    error: null
  },
  carts: {
    list: [],
    selectedCart: {},
    userCarts: [],
    loading: false,
    error: null
  },
  cart: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  },
  auth: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  categories: {
    list: [],
    loading: false,
    error: null
  }
}
```

## 🔄 Common Actions

### Get Products

```javascript
dispatch(getProducts()); // in Products.jsx
dispatch(getProductById(id)); // in ProductDetail.jsx
```

### Get Users

```javascript
dispatch(getUsers()); // in Users.jsx
dispatch(getUserById(id)); // in UserDetail.jsx
```

### Get Carts

```javascript
dispatch(getAllCarts()); // in Carts.jsx
dispatch(getCartById(id)); // in CartDetail.jsx
dispatch(getUserCarts(userId)); // Fetch user's carts
```

### Authentication

```javascript
dispatch(loginUser({ username, password })); // Login
dispatch(logout()); // Logout
```

### Shopping Cart

```javascript
dispatch(addToCart(product)); // Add item
dispatch(removeFromCart({ id })); // Remove item
dispatch(updateQuantity({ id, quantity })); // Update qty
dispatch(clearCart()); // Clear all items
```

## 🎨 Bootstrap Classes Used

- `container` - Layout container
- `row`, `col-*` - Grid system
- `card` - Card components
- `btn`, `btn-danger`, `btn-outline-*` - Buttons
- `badge` - Badge notifications
- `dropdown` - Dropdown menus
- `navbar` - Navigation bar
- `table` - Table display
- `alert` - Alert messages
- `spinner` - Loading spinner
- `form-*` - Form elements

## 🌈 Color Scheme

- **Primary**: `#ff6b6b` (Red/Danger)
- **Secondary**: `#495057` (Gray)
- **Background**: `#f8f9fa` (Light Gray)
- **Dark**: `#212529` (Dark Gray for navbar)

## 📱 Responsive Breakpoints

- **Mobile**: xs (< 576px)
- **Tablet**: md (≥ 768px)
- **Desktop**: lg (≥ 992px)
- **Large Desktop**: xl (≥ 1200px)

## 🐛 Troubleshooting

### CORS Errors

- ✅ Already fixed with Vite proxy in dev mode
- ✅ Check `vite.config.js` proxy settings

### Products Not Loading

- ✅ Click "Retry" button on error
- ✅ Check network tab in browser DevTools
- ✅ Ensure fakestoreapi.com is accessible

### Login Issues

- ✅ Use demo credentials: mor*2314 / 83r%^*
- ✅ Check localStorage in DevTools
- ✅ Verify token is being stored

### Redux State Issues

- ✅ Install Redux DevTools browser extension
- ✅ Check Redux store in DevTools
- ✅ Verify thunk responses in console

## 📊 File Sizes

- `api/fakeStoreApi.js` - All API endpoints
- `store/slices/*.js` - Redux state slices
- `pages/*.jsx` - Page components
- `components/Navbar.jsx` - Navigation component

## 🚀 Performance Tips

1. **Browser Caching**: Products are cached in Redux
2. **Lazy Loading**: Routes are lazy loaded
3. **LocalStorage**: Token persists across sessions
4. **Error Retry**: Failed API calls can be retried
5. **Loading States**: UX feedback during requests

## 🔗 API Base URL

- **Development**: `/api` (proxied to fakestoreapi.com)
- **Production**: `https://fakestoreapi.com`

## 📚 Key Files to Modify

| File                        | Purpose                |
| --------------------------- | ---------------------- |
| `src/api/fakeStoreApi.js`   | Add new API endpoints  |
| `src/store/slices/*.js`     | Modify Redux state     |
| `src/pages/*.jsx`           | Update page components |
| `src/App.jsx`               | Add new routes         |
| `src/components/Navbar.jsx` | Update navigation      |
| `vite.config.js`            | Update Vite config     |

## ✨ Next Steps

1. ✅ Explore all pages via Navbar
2. ✅ Try authentication with demo credentials
3. ✅ Add products to cart
4. ✅ Browse users and their carts
5. ✅ View product details
6. ✅ Check Redux state in DevTools

---

**Enjoy exploring Chaitanya Kart! 🎉**
