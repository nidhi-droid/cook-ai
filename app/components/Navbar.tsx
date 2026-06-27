export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <h1 className="text-3xl font-bold text-orange-500">
          🍳 CookAI
        </h1>

        <div className="flex items-center gap-8 font-medium">
          <a href="/" className="hover:text-orange-500">
            Home
          </a>

          <a href="/recipes" className="hover:text-orange-500">
            Recipes
          </a>

          <a href="/search" className="hover:text-orange-500">
            AI Search
          </a>

          <a href="/pricing" className="hover:text-orange-500">
            Premium
          </a>

          <button className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600">
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}