import { RootState } from "@/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logoutUser } from "../states/authSlice";
import { isTokenExpired } from "@/lib/jwt";
import { BASE_URL } from "@/utils/constants/routes";
import { toast } from "sonner";

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        // const token = state.auth.token || localStorage.getItem("token");
        // if (token) {
            // if (isTokenExpired(token)) {
                // localStorage.removeItem("token");
                // We'll handle expired tokens in the response handler instead
            // } else {
                // headers.set("Authorization", `Bearer ${token}`);
            // }
        // }

        return headers;
    }
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    // Type guard to check if result has error property
    if ('error' in result && result.error && 'status' in result.error && result.error.status === 401) {
        api.dispatch(logoutUser({showToast:false}));
        toast.error("Session expired, please log in again");

    }

    return result;
};