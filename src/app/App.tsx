"use client";

import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import { toast, Toaster } from 'sonner'
import Footer from './components/Footer'
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBrandsQuery } from '@/features/api/brandApiSlice';
import { setBrand } from '@/features/api/brandSlice';
import { usePathname, useRouter } from 'next/navigation';
import { decodeToken, JwtPayload } from './utils/lib/jwt';
import { logoutUser, logUser, resetUser } from '@/features/states/authSlice';
import { useGetCategoriesQuery } from '@/features/api/categoryApiSlice';
import { setCategories, setCategoriesLoading } from '@/features/states/CategorySlice';
import { cartApi, useGetCartQuery } from '@/features/api/cartApiSlice';
import { cartInitialState, resetCart, setCart, setCartLoading } from '@/features/states/cartSlice';
import { useGetProfileQuery, useLazyGetProfileQuery, userApi } from '@/features/api/userApiSlice';
import { BASE_URL } from './utils/constants/routes';

const App = ({
    children,
}: {
    children: React.ReactNode,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const pathname = usePathname();

    const adminRoute = useMemo(() => pathname.includes("/admin"), [pathname]);

    const { data: brands } = useGetBrandsQuery();
    const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data: cartItems, isLoading: isCartLoading, error: cartError,refetch: refetchCart } = useGetCartQuery();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Get user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
               const res = await fetch(`${BASE_URL}/profile`);
               const response = await res.json();
               const data = response.data;
                if (data) {
                    dispatch(logUser({ user: data }));
                    toast.success(`Welcome ${data.fullName}`)
                }
               
            } catch (error) {
            }
        };
        fetchProfile();
    }, [dispatch]);

    // Invalidate cache on login state change
    useEffect(() => {
        if (loggedIn ) {
            if(!pathname.includes("/admin")){
                // dispatch(userApi.util.invalidateTags(['User']));
                // dispatch(cartApi.util.invalidateTags(['Cart']));
                refetchCart();
            }
        }
        else{
            dispatch(resetUser());
            dispatch(resetCart());
        }
    }, [loggedIn,dispatch]);



    // Update brands
    useEffect(() => {
        brands?.data && dispatch(setBrand(brands.data));
    }, [brands, dispatch]);

    // Update categories
    useEffect(() => {
        categoriesResponse && dispatch(setCategories(categoriesResponse));
        isCategoriesLoading && dispatch(setCategoriesLoading(true));
    }, [categoriesResponse, isCategoriesLoading, dispatch]);

    // Update cart
    useEffect(() => {
        isCartLoading && dispatch(setCartLoading(true));
        cartItems?.data && dispatch(setCart(cartItems.data));
        cartError && dispatch(resetCart());
    }, [cartItems, isCartLoading, cartError, dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            {!adminRoute && <Navbar />}
            <div className="flex-1 min-h-[20vh]">
                {children}
            </div>
            {!adminRoute && <Footer />}
        </div>
    )
}

export default App
