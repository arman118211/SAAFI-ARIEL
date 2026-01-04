import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existing = state.items.find(
        (i) => i.productId === item.productId
      )

      if (existing) {
        existing.qty += item.qty
      } else {
        state.items.push(item)
      }
    },

    updateCartQty: (state, action) => {
      const { productId, qty } = action.payload
      const item = state.items.find((i) => i.productId === productId)
      if (item) item.qty = qty
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload
      )
    },

    clearCart: (state) => {
      state.items = []
    },
  },
})

export const {
  addToCart,
  updateCartQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
