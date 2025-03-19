import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ReactQueryProvider from "@/app/utils/Providers/ReactQueryProvider";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import Wrapper from "./components/Wrapper";
import App from "./App";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyHomeTechuniverse",
  description: "MyHomeTechuniverse Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
      className={inter.className}
      >
        <div className="">
          <StoreProvider>
            {/* <ReactQueryProvider> */}
            <Toaster position="top-center" duration={3000} />
              <App>
                {children}
              </App>
            {/* </ReactQueryProvider> */}
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
