import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sellersReducer from "./slices/sellerSlice";
import ordersReducer from "./slices/orderSlice";
import offersReducer from "./slices/offersSlice"
import dealerReducer from "./slices/dealerSlice"
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellersReducer,
    orders: ordersReducer,
    offers: offersReducer,
    dealers: dealerReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
