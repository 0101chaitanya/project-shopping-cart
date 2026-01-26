

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCartById,
  fetchCarts,
  fetchUserCarts,
} from "../../api/fakeStoreApi";


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
    list: [], 
    selectedCart: null, 
    userCarts: [], 
    loading: false, 
    error: null, 
  },
  reducers: {
    
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



