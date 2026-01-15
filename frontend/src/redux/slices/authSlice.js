import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
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
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/seller/auth/login`, {
        identifier:email,
        password,
      });

      return res.data; // contains { message, seller, token }
    } catch (error) {
      console.log("failed from the server",error)
      toast.error(error.response.data.message || "Something went Worng . Try after some time")

      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  "auth/updateSellerProfile",
  async (
    { name, address, currentPassword, newPassword,id},
    { getState, rejectWithValue }
  ) => {
    try {
      const {
        auth: { token },
      } = getState();

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/seller/auth/update`,
        { name, address, currentPassword, newPassword,id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data; // { message, seller }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Profile update failed"
      );
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
      })

      .addCase(updateSellerProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(updateSellerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.seller = action.payload.seller;

      // keep token unchanged
      localStorage.setItem(
        "sellerInfo",
        JSON.stringify(action.payload.seller)
      );
    })

    .addCase(updateSellerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
