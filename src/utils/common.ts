import { User } from "@/features/states/authSlice";

export const logUserIn = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
}

export const logUserOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}

