"use client";

import { useMemo, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function SearchRecipes({ recipes }: { recipes: any[] }) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [category, setCategory] = useState("All");

  // Unique Countries
  const countries = useMemo(() => {
    return [
      "All",
      ...new Set(
        recipes
          .map((recipe) => recipe.country?.Name)
          .filter(Boolean)
      ),
    ];
  }, [recipes]);

  // Unique Categories
  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        recipes
          .map((recipe) => recipe.category?.Category)
          .filter(Boolean)
      ),
    ];
  }, [recipes]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCountry =
      country === "All" || recipe.country?.Name === country;

    const matchCategory =
      category === "All" ||
      recipe.category?.Category === category;

    return matchSearch && matchCountry && matchCategory;
  });

 return (
  <>
    {/* Search + Filters */}
    <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 px-4 py-3 rounded-lg border-2 border-orange-300
        bg-white dark:bg-gray-900
        text-black dark:text-white
        placeholder:text-gray-500 dark:placeholder:text-gray-400
        focus:outline-none focus:border-orange-500"
      />

      {/* Country Filter */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="px-4 py-3 rounded-lg border-2 border-orange-300
        bg-white dark:bg-gray-900
        text-black dark:text-white
        focus:outline-none focus:border-orange-500"
      >
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-3 rounded-lg border-2 border-orange-300
        bg-white dark:bg-gray-900
        text-black dark:text-white
        focus:outline-none focus:border-orange-500"
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

    </div>

    {/* Recipe Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe: any) => (
          <RecipeCard
            key={recipe.documentId}
            id={recipe.documentId}
            title={recipe.title}
            country={recipe.country?.Name || "Unknown"}
            time={`${recipe.cookingTime} mins`}
            image={`http://localhost:1337${recipe.image?.url}`}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-xl text-gray-500 dark:text-gray-400">
          😔 No recipes found
        </p>
      )}
    </div>
  </>
);
}