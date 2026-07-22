   import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center bg-orange-50 dark:bg-gray-950 text-center px-6 transition-colors">

      <h1 className="text-5xl font-bold text-orange-600 dark:text-orange-400">
        Cook Anything with AI 🍳
      </h1>

      <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300">
        Upload ingredients, take a photo, or type what you have.
        AI will suggest delicious recipes instantly.
      </p>

      <SearchBar />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700 transition">
          <h2 className="text-xl font-semibold dark:text-white">
            📷 Scan Ingredients
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload a photo and let AI detect your ingredients.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700 transition">
          <h2 className="text-xl font-semibold dark:text-white">
            🤖 AI Recipe Search
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find recipes by typing ingredients or your cravings.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border dark:border-gray-700 transition">
          <h2 className="text-xl font-semibold dark:text-white">
            🌍 World Recipes
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Explore delicious recipes from different countries.
          </p>
        </div>

      </div>

    </section>
  );
}