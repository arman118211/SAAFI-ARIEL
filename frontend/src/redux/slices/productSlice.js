import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (seller, { rejectWithValue }) => {
    try {
      // ✅ SAME ROLE LOGIC
      const role = seller?.role
        ? seller.role === "admin"
          ? "common"
          : seller.role
        : "common"

      // console.log("role -->", role)

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/getProductss`,
        { role }
      )

      // console.log("product api response -->", res)

      return res.data.products
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load products"
      )
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default productSlice.reducer
