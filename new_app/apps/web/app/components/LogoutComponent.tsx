"use client";
import React from "react";
import { ModeToggle } from "./ThemeComponents";

const Logout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <ModeToggle />
      <div id="logout" className=" p-8 rounded shadow-md w-full max-w-md">
    
        <h2 className="text-2xl font-bold mb-6">Welcome!</h2>
        <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <a href="/login">Login</a>
        </button>
      </div>
    </div>
  );
};

export default Logout;
