"use client";
import "./globals.css";

import { Inter } from "next/font/google";

import React, { useEffect } from "react";
import AdminNavbar from "@/components/Navbars/AdminNavbar.js";
import Sidebar from "@/components/Sidebar/Sidebar.js";
import HeaderStats from "@/components/Headers/HeaderStats.js";
import FooterAdmin from "@/components/Footers/FooterAdmin.js";
import Providers from "@/contexts/react-query/Providers";
import { GlobalContextProvider } from "@/contexts/GlobalContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Providers>{children}</Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}