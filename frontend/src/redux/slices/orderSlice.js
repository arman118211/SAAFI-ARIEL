import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],    // will store the array you posted
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Set full orders list
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    // Add new order
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    // Update order by ID (status, items, offer, etc.)
    updateOrder: (state, action) => {
      const updated = action.payload; // must include _id
      const index = state.orders.findIndex((o) => o._id === updated._id);

      if (index !== -1) {
        state.orders[index] = {
          ...state.orders[index],
          ...updated,
        };
      }
    },

    // Change only status
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) order.status = status;
    },

    // Remove order
    removeOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload);
    },
  },
});

// Export actions
export const {
  setOrders,
  addOrder,
  updateOrder,
  updateOrderStatus,
  removeOrder,
} = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;

export const selectOrderById = (id) => (state) =>
  state.orders.orders.find((o) => o._id === id);

export const selectOrdersBySeller = (sellerId) => (state) =>
  state.orders.orders.filter((o) => o.sellerId._id === sellerId);

// Export reducer
export default ordersSlice.reducer;
