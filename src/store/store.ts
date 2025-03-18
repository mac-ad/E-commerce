import { configureStore } from "@reduxjs/toolkit";

import authReducer, { logoutUser } from '../features/states/authSlice';
import categoryReducer from '../features/states/CategorySlice';
import productReducer from '../features/states/productSlice';
import bannerReducer from '../features/states/BannerSlice';
import brandReducer from '../features/api/brandSlice';
import cartReducer from '../features/states/cartSlice';

import { authApi } from '../features/api/apiSlice';
import { categoryApi } from '../features/api/categoryApiSlice';
import { productApi } from '../features/api/productApiSlice';
import { bannerApi } from '../features/api/bannerApiSlice';
import { brandApi } from '../features/api/brandApiSlice';
import { orderApi } from '../features/api/orderApiSlice';
import { userApi } from '../features/api/userApiSlice';
import { cartApi } from '../features/api/cartApiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        banner: bannerReducer,
        brand: brandReducer,
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware, 
            categoryApi.middleware,
            productApi.middleware,
            bannerApi.middleware,
            brandApi.middleware,
            orderApi.middleware,
            userApi.middleware,
            cartApi.middleware
        ),
});

// Define RootState & AppDispatch for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
