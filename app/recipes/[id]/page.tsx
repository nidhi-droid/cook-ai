import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function getRecipe(documentId: string) {
  const res = await fetch(
    `http://localhost:1337/api/recipes/${documentId}?populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const json = await res.json();
  return json.data;
}

export default async function RecipeDetails({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back Button */}
      <Link
        href="/"
        className="text-orange-600 font-semibold hover:underline"
      >
        ← Back
      </Link>

      {/* Image + Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <img
          src={`http://localhost:1337${recipe.image.url}`}
          alt={recipe.title}
          className="w-full h-[450px] object-cover rounded-2xl shadow-xl"
        />

        {/* Details */}
        <div>
          <h1 className="text-5xl font-bold mb-6">
            {recipe.title}
          </h1>

          <p className="text-xl text-gray-700 mb-4">
            🌍 <span className="font-semibold">Country:</span>{" "}
            {recipe.country?.Name}
          </p>

          <p className="text-xl text-orange-600 mb-4">
            ⏱ <span className="font-semibold">Cooking Time:</span>{" "}
            {recipe.cookingTime} mins
          </p>

          <p className="text-xl mb-4">
            ⭐ <span className="font-semibold">Difficulty:</span>{" "}
            {recipe.difficulty}
          </p>

          <p className="text-xl mb-4">
            🔥 <span className="font-semibold">Calories:</span>{" "}
            {recipe.calories}
          </p>

          <div className="mt-6">
            {recipe.premium ? (
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                ⭐ Premium Recipe
              </span>
            ) : (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                Free Recipe
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Description
        </h2>

        <p className="text-lg text-gray-700 leading-8">
          {recipe.description}
        </p>
      </div>

      {/* Ingredients */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Ingredients
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
          {recipe.ingredients?.map((item: any, index: number) => (
            <li key={index}>
              {item.children?.map((child: any) => child.text).join("")}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Steps
        </h2>

        <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
          {recipe.steps?.map((item: any, index: number) => (
            <li key={index}>
              {item.children?.map((child: any) => child.text).join("")}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}