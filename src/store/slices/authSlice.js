/**
 * Authentication Redux Slice
 *
 * Manages user authentication state including:
 * - User login/logout
 * - JWT token storage and management
 * - Authentication status and error handling
 * - Persistent state via localStorage
 *
 * The auth state is persisted in localStorage so users remain logged in
 * across browser sessions.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser as loginUserAPI } from "../../api/fakeStoreApi";

/**
 * Async thunk for user login
 *
 * Calls the loginUser API and stores the returned token in localStorage.
 * On success, stores both token and username for later retrieval.
 * On failure, clears any stored credentials and returns error message.
 *
 * @async
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.username - The username
 * @param {string} credentials.password - The password
 * @returns {Promise<Object>} Response with token from API
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(username, password);
      if (response.token) {
        // Persist token and username to localStorage for session persistence
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", username);
        return response;
      }
      throw new Error("No token received");
    } catch (error) {
      // Clear any stored credentials on login failure
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Authentication Redux Slice
 *
 * State Properties:
 * - user: Current logged-in username (string | null)
 * - token: JWT token for authenticated requests (string | null)
 * - loading: Whether a login request is in progress (boolean)
 * - error: Error message if login failed (string | null)
 * - isAuthenticated: Whether user is currently logged in (boolean)
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Restore authentication state from localStorage on app load
    user: localStorage.getItem("username") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    /**
     * Logout reducer
     * Clears all auth state and removes stored credentials from localStorage
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    /**
     * Clear error reducer
     * Clears any error messages from previous failed login attempts
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle loginUser async thunk states
    builder
      // Set loading state when login starts
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // On successful login, store token and user info
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.username || action.meta.arg.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      // On login failure, clear auth state and show error
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
