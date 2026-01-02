import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// 🔹 Fetch all dealers (ONE TIME)
export const fetchDealers = createAsyncThunk(
  "dealers/fetchDealers",
  async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/seller/auth/getAllSeller`,
      { role: "dealer" }
    )
    return res.data.data
  }
)

// 🔹 Approve dealer
export const approveDealer = createAsyncThunk(
  "dealers/approveDealer",
  async (dealerId) => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/seller/auth/approveDealer`,
      { sellerId: dealerId, isApproved: true }
    )
    return dealerId
  }
)

const dealerSlice = createSlice({
  name: "dealers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch dealers
      .addCase(fetchDealers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDealers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchDealers.rejected, (state) => {
        state.loading = false
      })

      // Approve dealer (LOCAL UPDATE 🔥)
      .addCase(approveDealer.fulfilled, (state, action) => {
        const dealer = state.list.find(d => d._id === action.payload)
        if (dealer) dealer.isApproved = true
      })
  },
})

export default dealerSlice.reducer
