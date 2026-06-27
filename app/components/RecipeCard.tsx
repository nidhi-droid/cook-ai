type RecipeCardProps = {
  title: string;
  country: string;
  time: string;
};

export default function RecipeCard({
  title,
  country,
  time,
}: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
      <div className="h-40 bg-orange-100 rounded-lg flex items-center justify-center text-5xl">
        🍽️
      </div>

      <h2 className="text-xl font-bold mt-4">{title}</h2>

      <p className="text-gray-500 mt-2">{country}</p>

      <p className="text-orange-500 mt-2">⏱ {time}</p>
    </div>
  );
}