const API_URL = "http://localhost:1337/api";

export async function getRecipes() {
  const res = await fetch(`${API_URL}/recipes?populate=*`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const json = await res.json();

  return json.data;
}