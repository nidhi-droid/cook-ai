"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    if (!search.trim()) return;

    router.push(`/search?query=${encodeURIComponent(search)}`);
  }

  return (
    <div className="mt-8 flex w-full max-w-xl rounded-xl shadow-lg overflow-hidden border border-orange-300 dark:border-gray-700">

      <input
        type="text"
        placeholder="Search recipes or ingredients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="flex-1 px-4 py-3 outline-none bg-white dark:bg-gray-900 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />

      <button
        onClick={handleSearch}
        className="bg-orange-500 text-white px-6 hover:bg-orange-600 transition"
      >
        Search
      </button>

    </div>
  );
}