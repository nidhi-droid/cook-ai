 "use client"; 
 import Link from "next/link";
import { useUser } from "@clerk/nextjs";

type RecipeCardProps = {
  id: string;
  title: string;
  country: string;
  time: string;
  image: string;
};

export default function RecipeCard({
  id,
  title,
  country,
  time,
  image,
}: RecipeCardProps) {

  const { user } = useUser();

  return (
    <Link href={`/recipes/${id}`}>
      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">

        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm font-semibold">
            ⏱ {time}
          </div>
        </div>

        <div className="p-5">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h2>

          <div className="flex items-center justify-between">

            <span className="text-gray-600 dark:text-gray-300">
              🌍 {country}
            </span>

            <button
             onClick={async (e) => {
  e.preventDefault();

  if (!user) {
    alert("Please login first ❤️");
    return;
  }

  try {
    const response = await fetch("http://localhost:1337/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          userId: user.id,
          recipeId: id,
          recipeTitle: title,
          image,
          country,
          cookingTime: parseInt(time),
        },
      }),
    });

    if (response.ok) {
      alert("❤️ Added to Favorites");
    } else {
      const error = await response.json();
      console.log(error);
      alert("Failed to save favorite");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
}}
              className="text-2xl hover:scale-125 transition"
            >
              ❤️
            </button>

          </div>

        </div>

      </div>
    </Link>
  );
}