import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryItem{
    _id:string;
    name:string;
    bannerImage:string;
  }


export interface CategoryState {
  data: CategoryItem[];
  total:number;
  isLoading:boolean;
  isError:boolean;
}

interface FetchCategoriesResponse {
  data: CategoryItem[];
  total: number;
}

const initialState: CategoryState = {
  data: [],
  total:0,
  isLoading:true,
  isError:false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<FetchCategoriesResponse>) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.isLoading = false;
      state.isError = false;
    },
    setCategoriesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCategoriesError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
  }
});

export const { setCategories, setCategoriesLoading, setCategoriesError } = categorySlice.actions;
export default categorySlice.reducer;
