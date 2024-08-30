import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ReactQueryProvider from "@/app/utils/Providers/ReactQueryProvider";

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
        <div >
        <ReactQueryProvider>

          <Navbar />
          {children}
          <Footer/>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
