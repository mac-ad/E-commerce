import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandState {
  data: Brand[]
}

export interface Brand {
    _id: string;
    name: string;
    logo: string;
}

const initialState: BrandState = {
  data: []
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<Brand[]>) => {
      state.data = action.payload;
    },
    clearBrand: (state) => {
    //   state.selectedBrand = null;
    }
  }
});

export const { setBrand, clearBrand } = brandSlice.actions;
export default brandSlice.reducer;
