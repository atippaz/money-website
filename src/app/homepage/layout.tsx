"use client";
import React from "react";
import Navbar from "@/components/layouts/Navbar";
const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default layout;
