"use client";
import { ContextProvider, useContexts } from "@/contexts/Context";
import { SecureProvider } from "@/contexts/Secure";
import React, { useEffect } from "react";
const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <SecureProvider>
        <Setup>{children}</Setup>
      </SecureProvider>
    </ContextProvider>
  );
};
const Setup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContexts()!;
  // // const refresh = useContextStore((x) => x.refresh);
  // // useEffect(() => {
  // context.init();
  // // }, []);
  return <>{children}</>;
};
export default main;
