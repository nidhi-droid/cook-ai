import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchRecipes from "./components/SearchRecipes";
import { getRecipes } from "./lib/strapi";

export default async function Home() {
 

  const recipes = await getRecipes();
  return (
    <>
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Popular Recipes
        </h2>

        <SearchRecipes recipes={recipes} />
      </section>
    </>
  );
}