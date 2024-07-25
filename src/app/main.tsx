"use client";
import { ContextProvider, useContexts } from "@/contexts/Context";
import React, { useEffect } from "react";
const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <Setup>{children}</Setup>
    </ContextProvider>
  );
};
const Setup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
export default main;
