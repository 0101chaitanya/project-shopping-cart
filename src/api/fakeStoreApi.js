/**
 * FakeStoreAPI Client Module
 *
 * This module provides all API functions for the Chaitanya Kart e-commerce platform.
 * It communicates with FakeStoreAPI to manage products, users, carts, and authentication.
 *
 * Configuration:
 * - Development: Uses /api proxy (configured in vite.config.js)
 * - Production: Uses direct FakeStoreAPI URL
 *
 * Error Handling: All functions include try-catch blocks with descriptive error messages
 * CORS: All requests include mode: "cors" for cross-origin support
 */

// Use proxy in development (/api), direct URL in production
// The Vite proxy forwards /api requests to https://fakestoreapi.com
const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://fakestoreapi.com";

// Base fetch configuration for GET requests
// Includes standard headers and CORS settings
const fetchOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// ============= PRODUCTS API SECTION =============
// Functions for fetching, creating, updating, and deleting products

/**
 * Fetch all products from the store
 * @async
 * @returns {Promise<Array>} Array of all products with full details
 * @throws {Error} If the API request fails
 * @example
 * const products = await fetchProducts();
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch products: " + error.message);
  }
};

/**
 * Fetch a single product by ID
 * @async
 * @param {number} id - The product ID to fetch
 * @returns {Promise<Object>} Single product object with full details
 * @throws {Error} If the API request fails or product not found
 * @example
 * const product = await fetchProductById(5);
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch product: " + error.message);
  }
};

/**
 * Fetch all available product categories
 * @async
 * @returns {Promise<Array>} Array of category names
 * @throws {Error} If the API request fails
 * @example
 * const categories = await fetchCategories();
 * // Returns: ["electronics", "jewelery", "men's clothing", "women's clothing"]
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch categories: " + error.message);
  }
};

/**
 * Fetch products filtered by a specific category
 * @async
 * @param {string} category - The category name to filter by
 * @returns {Promise<Array>} Array of products in the specified category
 * @throws {Error} If the API request fails
 * @example
 * const electronics = await fetchProductsByCategory('electronics');
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`,
      {
        ...fetchOptions,
        mode: "cors",
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch products: " + error.message);
  }
};

/**
 * Create a new product in the store
 * @async
 * @param {Object} product - Product object with title, price, description, category, image
 * @returns {Promise<Object>} Created product object with assigned ID
 * @throws {Error} If the API request fails
 * @example
 * const newProduct = await createProduct({
 *   title: 'New Product',
 *   price: 99.99,
 *   description: 'Product description',
 *   category: 'electronics',
 *   image: 'url_to_image'
 * });
 */
export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to create product: " + error.message);
  }
};

/**
 * Update an existing product
 * @async
 * @param {number} id - The product ID to update
 * @param {Object} product - Updated product data (partial or complete)
 * @returns {Promise<Object>} Updated product object
 * @throws {Error} If the API request fails
 * @example
 * const updated = await updateProduct(5, { price: 79.99, title: 'Updated Title' });
 */
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to update product: " + error.message);
  }
};

/**
 * Delete a product from the store
 * @async
 * @param {number} id - The product ID to delete
 * @returns {Promise<Object>} Confirmation response from API
 * @throws {Error} If the API request fails
 * @example
 * await deleteProduct(5);
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to delete product: " + error.message);
  }
};

// ============= USERS API SECTION =============
// Functions for managing user accounts and user profile data

/**
 * Fetch all registered users
 * @async
 * @returns {Promise<Array>} Array of all user objects with full profile information
 * @throws {Error} If the API request fails
 * @example
 * const users = await fetchUsers();
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch users: " + error.message);
  }
};

/**
 * Fetch a single user by ID
 * @async
 * @param {number} id - The user ID to fetch
 * @returns {Promise<Object>} User object with full profile information
 * @throws {Error} If the API request fails or user not found
 * @example
 * const user = await fetchUserById(1);
 */
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch user: " + error.message);
  }
};

/**
 * Create a new user account
 * @async
 * @param {Object} user - User object with required fields: username, password, email, etc.
 * @returns {Promise<Object>} Created user object with assigned ID
 * @throws {Error} If the API request fails
 * @example
 * const newUser = await createUser({
 *   username: 'john_doe',
 *   password: 'pass123',
 *   email: 'john@example.com'
 * });
 */
export const createUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to create user: " + error.message);
  }
};

/**
 * Update user profile information
 * @async
 * @param {number} id - The user ID to update
 * @param {Object} user - Updated user data (partial or complete)
 * @returns {Promise<Object>} Updated user object
 * @throws {Error} If the API request fails
 * @example
 * const updated = await updateUser(1, { email: 'newemail@example.com' });
 */
export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to update user: " + error.message);
  }
};

/**
 * Delete a user account
 * @async
 * @param {number} id - The user ID to delete
 * @returns {Promise<Object>} Confirmation response from API
 * @throws {Error} If the API request fails
 * @example
 * await deleteUser(1);
 */
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to delete user: " + error.message);
  }
};

// ============= CARTS API SECTION =============
// Functions for managing shopping carts and cart items

/**
 * Fetch all shopping carts
 * @async
 * @returns {Promise<Array>} Array of all cart objects with items
 * @throws {Error} If the API request fails
 * @example
 * const carts = await fetchCarts();
 */
export const fetchCarts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch carts: " + error.message);
  }
};

/**
 * Fetch a specific shopping cart by ID
 * @async
 * @param {number} id - The cart ID to fetch
 * @returns {Promise<Object>} Cart object with userId, date, and items array
 * @throws {Error} If the API request fails or cart not found
 * @example
 * const cart = await fetchCartById(5);
 */
export const fetchCartById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch cart: " + error.message);
  }
};

/**
 * Fetch all shopping carts belonging to a specific user
 * @async
 * @param {number} userId - The user ID whose carts to fetch
 * @returns {Promise<Array>} Array of carts for that user
 * @throws {Error} If the API request fails
 * @example
 * const userCarts = await fetchUserCarts(3);
 */
export const fetchUserCarts = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/user/${userId}`, {
      ...fetchOptions,
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch user carts: " + error.message);
  }
};

/**
 * Create a new shopping cart
 * @async
 * @param {Object} cart - Cart object with userId and products array
 * @returns {Promise<Object>} Created cart object with assigned ID
 * @throws {Error} If the API request fails
 * @example
 * const newCart = await createCart({
 *   userId: 1,
 *   products: [{ productId: 5, quantity: 2 }]
 * });
 */
export const createCart = async (cart) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(cart),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to create cart: " + error.message);
  }
};

/**
 * Update a shopping cart (add/remove/modify items)
 * @async
 * @param {number} id - The cart ID to update
 * @param {Object} cart - Updated cart data with products array
 * @returns {Promise<Object>} Updated cart object
 * @throws {Error} If the API request fails
 * @example
 * const updated = await updateCart(5, { products: [{ productId: 3, quantity: 1 }] });
 */
export const updateCart = async (id, cart) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(cart),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to update cart: " + error.message);
  }
};

/**
 * Delete a shopping cart
 * @async
 * @param {number} id - The cart ID to delete
 * @returns {Promise<Object>} Confirmation response from API
 * @throws {Error} If the API request fails
 * @example
 * await deleteCart(5);
 */
export const deleteCart = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to delete cart: " + error.message);
  }
};

// ============= AUTHENTICATION API SECTION =============
// Functions for user login and JWT token management

/**
 * Login user with username and password
 *
 * Verified valid test credentials:
 * - username: mor_2314, password: 83r5^_
 * - username: johnd, password: m38rmF$
 * - username: kevinryan, password: kev02937@
 *
 * The returned token should be stored in localStorage and included
 * in Authorization headers for protected API endpoints.
 *
 * @async
 * @param {string} username - The user's username
 * @param {string} password - The user's password
 * @returns {Promise<Object>} Response object containing JWT token
 * @throws {Error} If credentials are invalid or API request fails
 * @example
 * const response = await loginUser('mor_2314', '83r5^_');
 * // Returns: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Login failed: ${errorData.message || response.statusText}`
      );
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("No token received from server");
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
