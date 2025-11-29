import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellers: [], // will store sellersData
  loading: false,
  error: null,
};

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    // Set full sellers list
    setSellers: (state, action) => {
      state.sellers = action.payload;
    },

    // Update a seller by ID
    updateSeller: (state, action) => {
      const updated = action.payload;
      const index = state.sellers.findIndex((s) => s._id === updated._id);

      if (index !== -1) {
        state.sellers[index] = { ...state.sellers[index], ...updated };
      }
    },

    // Add a new seller
    addSeller: (state, action) => {
      state.sellers.push(action.payload);
    },

    // Remove seller by ID
    removeSeller: (state, action) => {
      state.sellers = state.sellers.filter(
        (seller) => seller._id !== action.payload
      );
    },

    // Clear all sellers
    clearSellers: (state) => {
      state.sellers = [];
    },
  },
});

// Export actions
export const {
  setSellers,
  addSeller,
  updateSeller,
  removeSeller,
  clearSellers,
} = sellersSlice.actions;

// Selector
export const selectSellers = (state) => state.sellers.sellers;

// Export reducer
export default sellersSlice.reducer;
