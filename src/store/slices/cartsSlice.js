/**
 * Shopping Carts API Redux Slice (store/slices/cartsSlice.js)
 *
 * Manages shopping cart data from the API:
 * - All carts in the system
 * - Selected individual cart details
 * - Carts for a specific user
 * - Loading and error states
 *
 * Note: This is different from cartSlice which manages the user's personal shopping cart
 * This slice deals with browsing all carts in the system.
 *
 * Async Thunks:
 * - getAllCarts: Fetch all carts from API
 * - getCartById: Fetch single cart by ID
 * - getUserCarts: Fetch carts for specific user
 *
 * State:
 * - list: Array of all carts
 * - selectedCart: Currently viewed cart
 * - userCarts: Carts filtered by user
 * - loading: API request in progress
 * - error: Error message if request fails
 *
 * Usage:
 * dispatch(getAllCarts()) - Load all carts
 * dispatch(getCartById(id)) - Load specific cart
 * dispatch(getUserCarts(userId)) - Load user's carts
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCartById,
  fetchCarts,
  fetchUserCarts,
} from "../../api/fakeStoreApi";

/**
 * Async thunk to fetch all carts
 * @async
 * @returns {Promise<Array>} All carts from API
 * @throws {Error} If API request fails
 */
export const getAllCarts = createAsyncThunk(
  "carts/getAllCarts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCarts();
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch carts";
      console.error("getAllCarts error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch single cart by ID
 * @async
 * @param {number} id - Cart ID to fetch
 * @returns {Promise<Object>} Cart details
 * @throws {Error} If API request fails
 */
export const getCartById = createAsyncThunk(
  "carts/getCartById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchCartById(id);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch cart";
      console.error("getCartById error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch carts for a specific user
 * @async
 * @param {number} userId - User ID to fetch carts for
 * @returns {Promise<Array>} User's carts
 * @throws {Error} If API request fails
 */
export const getUserCarts = createAsyncThunk(
  "carts/getUserCarts",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await fetchUserCarts(userId);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch user carts";
      console.error("getUserCarts error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    list: [], // Array of all carts
    selectedCart: null, // Currently selected cart
    userCarts: [], // Carts for a specific user
    loading: false, // Loading indicator
    error: null, // Error message
  },
  reducers: {
    /**
     * Clear the selected cart from state
     */
    clearSelectedCart: (state) => {
      state.selectedCart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCart = action.payload;
      })
      .addCase(getCartById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.userCarts = action.payload;
      })
      .addCase(getUserCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedCart } = cartsSlice.actions;
export default cartsSlice.reducer;
