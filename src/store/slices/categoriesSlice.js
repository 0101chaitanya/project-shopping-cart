/**
 * Product Categories Redux Slice (store/slices/categoriesSlice.js)
 *
 * Manages product category data:
 * - List of available categories
 * - Loading and error states during API calls
 *
 * Async Thunks:
 * - getCategories: Fetch all product categories from API
 *
 * State:
 * - list: Array of category names
 * - loading: API request in progress
 * - error: Error message if request fails
 *
 * Usage:
 * dispatch(getCategories()) - Load all categories
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api/fakeStoreApi";

/**
 * Async thunk to fetch all product categories
 * @async
 * @returns {Promise<Array>} Array of category names
 * @throws {Error} If API request fails
 */
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategories();
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch categories";
      console.error("getCategories error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [], // Array of category names
    loading: false, // Loading indicator
    error: null, // Error message
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
