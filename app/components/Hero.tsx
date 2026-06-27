   import SearchBar from "./SearchBar";
   export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center bg-orange-50 text-center px-6">
      <h1 className="text-5xl font-bold text-orange-600">
        Cook Anything with AI 🍳
      </h1>

      <p className="mt-6 text-gray-600 max-w-2xl">
        Upload ingredients, take a photo, or type what you have.
        AI will suggest delicious recipes instantly.
      </p>

      <SearchBar />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold">📷 Scan Ingredients</h2>
    <p className="text-gray-600 mt-2">
      Upload a photo and let AI detect your ingredients.
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold">🤖 AI Recipe Search</h2>
    <p className="text-gray-600 mt-2">
      Find recipes by typing ingredients or your cravings.
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold">🌍 World Recipes</h2>
    <p className="text-gray-600 mt-2">
      Explore delicious recipes from different countries.
    </p>
  </div>

</div>
    </section>
  );
}