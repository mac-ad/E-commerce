"use client";

import React from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setToken, setUser } from "@/app/utils/store/authSlice"; // Adjust the import as needed

const TokenCheck = () => {
  const dispatch = useDispatch();

  // Check if the token exists in the cookies
  React.useEffect(() => {
    const token = Cookies.get("token");
    console.log("token checking try", token);

    if (token) {
      // If token exists, dispatch it to Redux (store)
      dispatch(setToken(token));

      // Optionally, you can extract user information from the token (if necessary)
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the token
        dispatch(setUser(decodedToken));
      } catch (err) {
        console.error("Error decoding token", err);
      }
    } else {
      dispatch(setToken(null));
    }
  }, [dispatch]);

  return null; // This component doesn't render anything, it's just for side effects
};

export default TokenCheck;
