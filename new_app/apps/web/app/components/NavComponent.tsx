"use client";
import React, { Component } from "react";
import { ModeToggle } from "./ThemeComponents";

export default class NavComponent extends Component {
  render() {
    return (
      <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="/" className="text-gray-800 dark:text-gray-200">
            Home
          </a>
          <a href="/login" className="text-gray-800 dark:text-gray-200">
            Login
          </a>
          <a href="/logout" className="text-gray-800 dark:text-gray-200">
            Logout
          </a>
        </div>
        <ModeToggle />
      </nav>
    );
  }
}
