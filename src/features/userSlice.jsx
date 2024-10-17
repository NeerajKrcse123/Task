import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      return {
        users: response.data.data,
        totalPages: response.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = [...state.users, ...action.payload.users];
        state.totalPages = action.payload.totalPages;
        state.page += 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error || "Failed to fetch users";
      });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
