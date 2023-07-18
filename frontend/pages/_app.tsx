import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ROUTES } from "../constants/routes";
import { ToastContainer, toast } from "react-toastify";
import { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, CssBaseline } from "@mui/material";

// 1. Checks if token is available or not.
// 2. If no token; log out!
const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // List of pages that do not require auth-token
  const isNoAuthPage =
    ROUTES.login.includes(router.pathname) ||
    ROUTES.register.includes(router.pathname);

  // Checks the current page and then checks the token!
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (isNoAuthPage) {
      if (token) {
        localStorage.setItem("auth_token", "");
      }
    } else {
      if (!token) {
        toast.error("Authentication failed! Redirecting to login page.");
        router.push(ROUTES.login);
      }
    }
  }, [isNoAuthPage, router]);

  return <>{children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={new QueryClient({})}>
        <CssBaseline />
        <ToastContainer position="top-right" theme="dark" />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
