

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api/fakeStoreApi";


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
    list: [], 
    loading: false, 
    error: null, 
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



