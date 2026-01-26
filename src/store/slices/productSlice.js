

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "../../api/fakeStoreApi";


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


const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], 
    selectedProduct: null, 
    loading: false, 
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
  
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



