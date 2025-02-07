import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/endPoints';

// Async action to update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data.user;  // Return the user data on success
    } catch (error) {
      return rejectWithValue(error.response.data.message);  // Handle errors
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set the user data
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;   // Set loading state during the request
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;  // Reset loading state when the request completes
        state.user = action.payload;  // Set user data on success
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;  // Reset loading state on failure
        state.error = action.payload;  // Capture the error
      });
  }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
