"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-orange-500 cursor-pointer">
            🍳 CookAI
          </h1>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 font-medium text-gray-800 dark:text-white">

          <Link href="/" className="hover:text-orange-500 transition">
            Home
          </Link>

          <Link href="/search" className="hover:text-orange-500 transition">
            🤖 AI Search
          </Link>

          <Link href="/favorites" className="hover:text-orange-500 transition">
            ❤️ Favorites
          </Link>

          <Link href="/history" className="hover:text-orange-500 transition">
            🕒 History
          </Link>

          <Link href="/pricing" className="hover:text-orange-500 transition">
            ⭐ Premium
          </Link>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="text-2xl hover:scale-110 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Login / User */}
          {!isSignedIn ? (
  <SignInButton mode="modal">
    <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition">
      Login
    </button>
  </SignInButton>
) : (
  <UserButton />
)}
          

        </div>
      </div>
    </nav>
  );
}