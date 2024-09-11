"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { appstore } from "./utils/appstore";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={appstore}>{children}</Provider>;
};

export default StoreProvider;
