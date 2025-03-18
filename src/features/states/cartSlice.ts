import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../api/cartApiSlice";


interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isLoading: false
};

export const cartInitialState = initialState;


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{items: CartItem[], totalQuantity: number, totalAmount: number}>) => {
      const { items, totalQuantity, totalAmount } = action.payload;
      return {
        ...state,
        items,
        totalQuantity,
        totalAmount,
        isLoading: false
      };
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.isLoading = false;
    }
  }
});

export const {setCart, setCartLoading, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
