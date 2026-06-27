import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecipeCard from "./components/RecipeCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Popular Recipes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RecipeCard
            title="Paneer Butter Masala"
            country="🇮🇳 India"
            time="30 mins"
          />

          <RecipeCard
            title="Margherita Pizza"
            country="🇮🇹 Italy"
            time="25 mins"
          />

          <RecipeCard
            title="Sushi"
            country="🇯🇵 Japan"
            time="45 mins"
          />
        </div>
      </section>
    </>
  );
}