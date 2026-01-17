/**
 * Redux Store Configuration (store/index.js)
 *
 * Centralized state management using Redux Toolkit
 * Combines all Redux slices into a single store instance
 *
 * Store Structure:
 * - products: Product listing and detail state
 * - cart: User's shopping cart (add/remove items, quantities)
 * - auth: Authentication state (login, user info, token)
 * - users: All users data from API
 * - categories: Product categories for filtering
 * - carts: All shopping carts from API
 *
 * All slices use createAsyncThunk for API calls with:
 * - Automatic pending/fulfilled/rejected states
 * - Error handling
 * - Loading indicators
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import cartsReducer from "./slices/cartsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productReducer from "./slices/productSlice";
import usersReducer from "./slices/usersSlice";

/**
 * Redux Store
 * Manages all application state with slices for different domains
 */
const store = configureStore({
  reducer: {
    products: productReducer, // Products from API
    cart: cartReducer, // User's shopping cart
    auth: authReducer, // Authentication and login
    users: usersReducer, // Users from API
    categories: categoriesReducer, // Product categories
    carts: cartsReducer, // All carts from API
  },
});

export default store;
