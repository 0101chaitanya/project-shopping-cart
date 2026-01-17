/**
 * Users Redux Slice (store/slices/usersSlice.js)
 *
 * Manages user data from the API:
 * - All users listing
 * - Selected individual user details
 * - Loading and error states
 *
 * Async Thunks:
 * - getUsers: Fetch all users from API
 * - getUserById: Fetch single user by ID
 *
 * State:
 * - list: Array of all users
 * - selectedUser: Currently viewed user details
 * - loading: API request in progress
 * - error: Error message if request fails
 *
 * Usage:
 * dispatch(getUsers()) - Load all users
 * dispatch(getUserById(id)) - Load specific user
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserById, fetchUsers } from "../../api/fakeStoreApi";

/**
 * Async thunk to fetch all users
 * @async
 * @returns {Promise<Array>} All users from API
 * @throws {Error} If API request fails
 */
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUsers();
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch users";
      console.error("getUsers error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Async thunk to fetch single user by ID
 * @async
 * @param {number} id - User ID to fetch
 * @returns {Promise<Object>} User details
 * @throws {Error} If API request fails
 */
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchUserById(id);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to fetch user";
      console.error("getUserById error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [], // Array of all users
    selectedUser: null, // Currently selected user
    loading: false, // Loading indicator
    error: null, // Error message
  },
  reducers: {
    /**
     * Clear the selected user from state
     */
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
