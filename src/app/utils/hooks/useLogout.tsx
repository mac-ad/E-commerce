import { useLogoutMutation } from '@/features/api/apiSlice';
import { cartApi } from '@/features/api/cartApiSlice';
import { userApi } from '@/features/api/userApiSlice';
import { logoutUser } from '@/features/states/authSlice';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export const useLogout = () => {


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


    const [logout] = useLogoutMutation();


    const logoutHandler = useCallback(async () => {
        try{
            const res = await logout().unwrap();
            // console.log(res);
            dispatch(logoutUser());
            dispatch(userApi.util.resetApiState());
            dispatch(cartApi.util.resetApiState());
            toast.success("Logged out successfully");
            router.push("/");
        }catch(err){
            console.log(err);
        }
    }, []);

    return {logoutHandler};
};
