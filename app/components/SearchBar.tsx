export default function SearchBar() {
  return (
    <div className="mt-8 flex w-full max-w-xl rounded-xl shadow-lg overflow-hidden">
      <input
        type="text"
        placeholder="Search recipes or ingredients..."
        className="flex-1 px-4 py-3 outline-none"
      />

      <button className="bg-orange-500 text-white px-6 hover:bg-orange-600">
        Search
      </button>
    </div>
  );
}