/**
 * Products Redux Slice (store/slices/productSlice.js)
 *
 * Manages product state for the entire application:
 * - All products listing
 * - Selected individual product details
 * - Loading and error states
 *
 * Async Thunks:
 * - getProducts: Fetch all products from API
 * - getProductById: Fetch single product by ID
 *
 * State:
 * - items: Array of all products
 * - selectedProduct: Currently viewed product details
 * - loading: API request in progress
 * - error: Error message if request fails
 *
 * Usage:
 * dispatch(getProducts()) - Load all products
 * dispatch(getProductById(id)) - Load specific product
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "../../api/fakeStoreApi";

/**
 * Async thunk to fetch all products
 * @async
 * @returns {Promise<Array>} All products from API
 * @throws {Error} If API request fails
 */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProducts();
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch products";
      console.error("getProducts error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch single product by ID
 * @async
 * @param {number} id - Product ID to fetch
 * @returns {Promise<Object>} Product details
 * @throws {Error} If API request fails
 */
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchProductById(id);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch product";
      console.error("getProductById error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Initial state for products slice
 */
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // Array of all products
    selectedProduct: null, // Currently selected product
    loading: false, // Loading indicator
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle getProducts async thunk
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle getProductById async thunk
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
