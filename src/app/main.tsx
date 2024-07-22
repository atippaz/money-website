"use client";

import React, { useEffect } from "react";
import { ContextProvider, useContexts } from "@/contexts/Context";

const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <MainProvider>{children}</MainProvider>
    </ContextProvider>
  );
};
const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ctx = useContexts();
  // useEffect(() => {
  //   ctx.refresh();
  // }, []);
  return <>{children}</>;
};
export default main;
