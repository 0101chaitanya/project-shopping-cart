import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserById, fetchUsers } from "../../api/fakeStoreApi";



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
    list: [], 
    selectedUser: null, 
    loading: false, 
    error: null, 
  },
  reducers: {
    
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



