"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface HistoryItem {
  prompt: string;
  recipe: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("recipeHistory") || "[]"
    );

    setHistory(saved);
  }, []);

  function clearHistory() {
    localStorage.removeItem("recipeHistory");
    setHistory([]);
  }

  const filtered = history.filter((item) =>
    item.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">

      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
        🕒 Recipe History
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

        <input
          type="text"
          placeholder="🔍 Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-orange-300 rounded-xl px-4 py-3 flex-1 outline-none focus:border-orange-500"
        />

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="bg-red-500 text-white px-6 rounded-xl hover:bg-red-600"
          >
            🗑 Clear History
          </button>
        )}

      </div>

      {filtered.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold">
            No Recipe History
          </h2>

          <p className="text-gray-500 mt-3">
            Generate recipes using AI and they will appear here.
          </p>

        </div>
      ) : (

        <div className="space-y-8">

          {filtered.map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-orange-200 dark:border-gray-700 p-6"
            >

              <p className="font-semibold text-orange-500 mb-5">
                🔍 {item.prompt}
              </p>

              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{item.recipe}</ReactMarkdown>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}