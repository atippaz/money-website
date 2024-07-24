"use client";
import HomePage from "@/app/homepage/page";
import stateManager from "@/contexts/test";
import { useEffect } from "react";
const Page = () => {
  useEffect(() => {
    console.log(stateManager.getState());
  }, []);
  return <HomePage />;
};

export default Page;
