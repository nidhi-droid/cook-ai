"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FavoriteRecipe {
  id: string;
  title: string;
  country: string;
  time: string;
  image: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(saved);
  }, []);

  function deleteRecipe(id: string) {
    const updated = favorites.filter((item) => item.id !== id);

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  }

  const filtered = favorites.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
        ❤️ Favorite Recipes
      </h1>

      <input
        type="text"
        placeholder="🔍 Search favorites..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 block mx-auto border-2 border-orange-300 rounded-xl p-3 mb-10 outline-none focus:border-orange-500"
      />

      {filtered.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold">
            No Favorites Yet ❤️
          </h2>

          <p className="text-gray-500 mt-3">
            Save recipes by clicking the heart icon.
          </p>

          <Link href="/">
            <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600">
              Browse Recipes
            </button>
          </Link>

        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filtered.map((recipe) => (

            <div
              key={recipe.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
            >

              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold dark:text-white">
                  {recipe.title}
                </h2>

                <p className="mt-2 dark:text-gray-300">
                  🌍 {recipe.country}
                </p>

                <p className="dark:text-gray-300">
                  ⏱ {recipe.time}
                </p>

                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="mt-5 w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                >
                  🗑 Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}