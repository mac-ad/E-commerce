import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReactQueryProvider from "@/app/utils/Providers/ReactQueryProvider";
import { Provider } from "react-redux";
import { appstore } from "@/app/utils/appstore";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
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
      <body className={inter.className}>
        <div>
          <StoreProvider>
            <ReactQueryProvider>
              <Toaster position="top-center" />
              <Navbar />
              {children}
              <Footer />
            </ReactQueryProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
