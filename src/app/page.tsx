"use client";
import HomePage from "@/app/homepage/page";
import Navbar from "@/components/layouts/Navbar";
const Page = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <div className="bg-slate-100 h-full w-full">
        <HomePage />
      </div>
    </div>
  );
};

export default Page;
