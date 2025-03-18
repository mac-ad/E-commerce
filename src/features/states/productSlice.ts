import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../api/productApiSlice';
// import { Product } from '../../types/Product';


interface ProductState {
  data: Product[];
  total: number;
}

const initialState: ProductState = {
  data: [],
  total: 0
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      state.total = action.payload.length;
    },
    // addProduct: (state, action: PayloadAction<Product>) => {
    //   state.data.push(action.payload);
    //   state.total += 1;
    // },
    // updateProduct: (state, action: PayloadAction<Product>) => {
    //   const index = state.data.findIndex(product => product._id === action.payload._id);
    //   if (index !== -1) {
    //     state.data[index] = action.payload;
    //   }
    // },
    // deleteProduct: (state, action: PayloadAction<string>) => {
    //   state.data = state.data.filter(product => product._id !== action.payload);
    //   state.total -= 1;
    // }
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
