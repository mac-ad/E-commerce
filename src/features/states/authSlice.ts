import { JwtPayload } from "@/app/utils/lib/jwt";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null | JwtPayload;
    loggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    loggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.user = action.payload.user;
            state.loggedIn = true;
            // localStorage.setItem("token", action.payload.token.toString());
        },
        setToken: (state, action: PayloadAction<string>) => {
            // localStorage.setItem("token", action.payload);
        },
        resetUser: (state) => {
            state.loggedIn = false;
            state.user = null;
            // localStorage.removeItem("token");
        },
        logoutUser: (state,action) => {
            state.loggedIn = false;
            state.user = null;
            // localStorage.removeItem("token");
            if(action.payload.showToast) toast.success("You are logged out. Please log back in");
        },
    },
});

export const { setToken, logoutUser,logUser,resetUser } = authSlice.actions;
export default authSlice.reducer;
