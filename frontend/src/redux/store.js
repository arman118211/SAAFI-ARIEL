import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sellersReducer from "./slices/sellerSlice";
import ordersReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellersReducer,
    orders: ordersReducer
  },
});
