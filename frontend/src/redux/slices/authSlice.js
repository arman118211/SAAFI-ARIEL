import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// -----------------------------------
// LOAD SAVED AUTH DATA (Fix Refresh)
// -----------------------------------
const storedSeller = localStorage.getItem("sellerInfo");
const storedToken = localStorage.getItem("sellerToken");

// -----------------------------------
// LOGIN THUNK
// -----------------------------------
export const loginSeller = createAsyncThunk(
  "auth/loginSeller",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/seller/auth/login`, {
        email,
        password,
      });

      return res.data; // contains { message, seller, token }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

// -----------------------------------
// AUTH SLICE
// -----------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    seller: storedSeller ? JSON.parse(storedSeller) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.seller = null;
      state.token = null;
      localStorage.removeItem("sellerToken");
      localStorage.removeItem("sellerInfo");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;

        // SAVE LOGIN DATA
        localStorage.setItem("sellerToken", action.payload.token);
        localStorage.setItem("sellerInfo", JSON.stringify(action.payload.seller));
      })

      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
