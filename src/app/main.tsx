"use client";
import { ContextProvider, useContexts } from "@/contexts/Context";
import { SecureProvider } from "@/contexts/Secure";
import stateManager from "@/contexts/test";
import React, { useEffect } from "react";
const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <Setup>{children}</Setup>
    </ContextProvider>
  );
};
const Setup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    stateManager.setState(localStorage.getItem("auth") || "");
  }, []);
  return <>{children}</>;
};
export default main;
