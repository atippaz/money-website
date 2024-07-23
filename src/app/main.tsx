"use client";
import useContextStore from "@/contexts/Context";
import React, { useEffect } from "react";
const main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const refresh = useContextStore((x) => x.refresh);
  useEffect(() => {
    refresh();
  }, []);
  return <>{children}</>;
};

export default main;
