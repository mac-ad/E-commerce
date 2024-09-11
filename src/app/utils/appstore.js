import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
export const appstore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
