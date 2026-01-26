

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser as loginUserAPI } from "../../api/fakeStoreApi";


let loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      
      let username = credentials.username;
      let password = credentials.password;
      let response = await loginUserAPI(username, password);
      if (response.token) {
        
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", username);
        
        return response;
      }
      throw new Error("No token received");
    } catch (error) {
      
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      
      return rejectWithValue(error.message);
    }
  }
);

export { loginUser };

let authSlice = createSlice({
  name: "auth",
  initialState: {
  
    user: localStorage.getItem("username") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        
        state.loading = false;
        state.user = action.payload.username || action.meta.arg.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;



