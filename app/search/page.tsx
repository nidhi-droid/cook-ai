"use client";
import { useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AISearchPage() {
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();

  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [image, setImage] = useState<File | null>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      setPrompt(query);
      generateRecipe(query);
    }
  }, []);

  

      
       async function generateRecipe(customPrompt?: string) {
  const finalPrompt = customPrompt || prompt;

  if (!finalPrompt.trim()) return;

  setLoading(true);
  setRecipe("");

  try {
    const formData = new FormData();

    formData.append("prompt", finalPrompt);
    formData.append("language", language);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      setRecipe(data.error);
    } else {
      setRecipe(data.recipe);

      const oldRecipes = JSON.parse(
        localStorage.getItem("recipeHistory") || "[]"
      );

      oldRecipes.unshift({
        prompt: finalPrompt,
        recipe: data.recipe,
      });

      localStorage.setItem(
        "recipeHistory",
        JSON.stringify(oldRecipes.slice(0, 10))
      );
    }
  } catch (error) {
    setRecipe("Something went wrong!");
  }

  setLoading(false);
}

async function surpriseRecipe() {
  if (!isSignedIn) {
    alert("🔒 Please login first to generate AI recipes.");
    return;
  }

  const ideas = [
    "Paneer Butter Masala",
    "Veg Biryani",
    "Pizza",
    "Pasta",
    "Burger",
    "Momos",
    "Noodles",
    "Chocolate Cake",
    "Ice Cream",
    "Healthy Salad",
    "Mexican Tacos",
    "Italian Lasagna",
    "Chinese Fried Rice",
    "Indian Street Food",
    "Healthy Breakfast",
    "Protein Rich Dinner",
    "South Indian Dosa",
    "Chole Bhature",
    "Rajma Chawal",
    "Palak Paneer",
  ];

  const random =
    ideas[Math.floor(Math.random() * ideas.length)];

  setPrompt(random);

  await generateRecipe(random);
}

function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setListening(true);

  recognition.start();

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setPrompt(transcript);
    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };
}

function downloadPDF() {
  const doc = new jsPDF();

  doc.setFontSize(14);

  const lines = doc.splitTextToSize(recipe, 180);

  doc.text(lines, 15, 20);

  doc.save("AI_Recipe.pdf");
}

function saveToFavorites() {
  const oldFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  oldFavorites.unshift({
    prompt,
    recipe,
  });

  localStorage.setItem(
    "favorites",
    JSON.stringify(oldFavorites)
  );

  alert("❤️ Recipe saved to Favorites!");
}
function shareOnWhatsApp() {
  const text = `${prompt}\n\n${recipe}`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}
function shareRecipe() {
  const text = `${prompt}\n\n${recipe}`;

  if (navigator.share) {
    navigator.share({
      title: "Cook AI Recipe",
      text,
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("✅ Recipe copied! Now you can share it anywhere.");
  }
  <button
  onClick={shareOnWhatsApp}
  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
>
  💬 WhatsApp
</button>
}
   console.log("AISearchPage Loaded");
   const nutrition = useMemo(() => {
  const getValue = (label: string) => {
    const regex = new RegExp(`${label}:\\s*(.*)`, "i");
    const match = recipe.match(regex);

    return match ? match[1].trim() : "--";
  };

  return {
    calories: getValue("Calories"),
    protein: getValue("Protein"),
    carbs: getValue("Carbohydrates"),
    fat: getValue("Fat"),
    fiber: getValue("Fiber"),
  };
}, [recipe]);

  return (
    <>
      <div className="bg-red-600 text-white text-4xl p-5">
        THIS IS SEARCH PAGE
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          🤖 AI Recipe Generator
        </h1>
        <div className="mb-4">
  <label className="block mb-2 font-semibold text-lg">
    🌍 Select Recipe Language
  </label>

  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="w-full border-2 border-orange-300 rounded-xl p-3 outline-none focus:border-orange-500"
  >
    <option>English</option>
    <option>Hindi</option>
    <option>French</option>
    <option>Spanish</option>
    <option>Italian</option>
    <option>Japanese</option>
    <option>Chinese</option>
  </select>
</div>

        {/* Prompt */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: I have paneer, onion, tomato and butter."
          className="w-full h-40 border-2 border-orange-300 rounded-xl p-4 text-lg outline-none focus:border-orange-500"
        />

        {/* Voice Search */}
        <div className="flex justify-end mt-3">
          <button
            onClick={startListening}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            {listening ? "🎙 Listening..." : "🎤 Voice Search"}
          </button>
        </div>

        {/* Upload Image */}
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            📷 Upload Ingredient Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="block w-full border border-gray-300 rounded-xl p-3"
          />

          {image && (
            <p className="mt-2 text-green-600 font-medium">
              ✅ Selected: {image.name}
            </p>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex gap-4 mt-6">

  <button
    onClick={() => {
      if (!isSignedIn) {
        alert("🔒 Please login first to generate AI recipes.");
        return;
      }

      generateRecipe();
    }}
    disabled={loading}
    className="flex items-center gap-3 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:bg-orange-300"
  >
    {loading && (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    )}

    {loading ? "Generating Recipe..." : "Generate Recipe"}
  </button>

  <button
    onClick={surpriseRecipe}
    className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700"
  >
    🎲 Surprise Me
  </button>

</div>

      {/* Recipe */}
      {recipe && (
        <div className="mt-10 bg-white rounded-3xl shadow-2xl border border-orange-200 p-8">
          {recipeImage && (
  <img
    src={recipeImage}
    alt="Recipe"
    className="w-full h-80 object-cover rounded-2xl mb-6"
  />
)}
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

  <div className="bg-orange-100 rounded-xl p-4 text-center shadow">
    <p className="text-3xl">🔥</p>
    <p className="font-bold">Calories</p>
    <p>{nutrition.calories}</p>
  </div>

  <div className="bg-red-100 rounded-xl p-4 text-center shadow">
    <p className="text-3xl">🥩</p>
    <p className="font-bold">Protein</p>
    <p>{nutrition.protein}</p>
  </div>

  <div className="bg-yellow-100 rounded-xl p-4 text-center shadow">
    <p className="text-3xl">🍞</p>
    <p className="font-bold">Carbs</p>
    <p>{nutrition.carbs}</p>
  </div>

  <div className="bg-green-100 rounded-xl p-4 text-center shadow">
    <p className="text-3xl">🧈</p>
    <p className="font-bold">Fat</p>
    <p>{nutrition.fat}</p>
  </div>

  <div className="bg-blue-100 rounded-xl p-4 text-center shadow">
    <p className="text-3xl">🥦</p>
    <p className="font-bold">Fiber</p>
    <p>{nutrition.fiber}</p>
  </div>

</div>

          <div className="flex justify-end gap-4 mb-6">

            <button
              onClick={saveToFavorites}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
            >
              ❤️ Save
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(recipe);
                alert("✅ Recipe copied!");
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              📋 Copy Recipe
            </button>

            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <button
  onClick={shareRecipe}
  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
>
  📤 Share
</button>

              📄 Download PDF
            </button>

          </div>

          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-orange-600 mb-6">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2">
                  {children}
                </h2>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-6 space-y-2">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-3">
                  {children}
                </ol>
              ),

              p: ({ children }) => (
                <p className="text-gray-700 leading-8">
                  {children}
                </p>
              ),
            }}
          >
            {recipe}
          </ReactMarkdown>
                </div>
      )}
      </div>
    </>
  );
}