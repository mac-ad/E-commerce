import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerState {
    data: Banner[];
    total: number;
}

export interface Banner {
    _id:string;
    image:string;
    link:string;
    isActive:boolean;
}

const initialState: BannerState = {
    data: [],
    total:0
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<Banner[]>) => {
      state.data = action.payload;
    }
  }
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
