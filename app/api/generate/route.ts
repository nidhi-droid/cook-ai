import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const prompt = formData.get("prompt")?.toString() || "";
    const language = formData.get("language")?.toString() || "English";
    const image = formData.get("image") as File |null;

    let contents: any;

    if (image) {
      const bytes = await image.arrayBuffer();

      const base64 = Buffer.from(bytes).toString("base64");

      contents = [
        {
          inlineData: {
            mimeType: image.type,
            data: base64,
          },
        },
        {
          text: `
You are a professional chef.

Look at this image and identify all visible ingredients.

Then generate a delicious recipe.

Generate the complete recipe in ${language} language.

Return ONLY markdown.

# Recipe Name

## 📝 Description

## 🛒 Ingredients

## 👨‍🍳 Steps

## ⏱ Cooking Time

## 🔥 Calories

## 💡 Chef Tips
`,
        },
      ];
    } else {
      contents = `
You are a professional chef.

Generate a delicious recipe using these ingredients.

Generate the complete recipe in ${language} language.
${prompt}

Return ONLY markdown.

# Recipe Name

## 📝 Description

## 🛒 Ingredients

## 👨‍🍳 Steps

## ⏱ Cooking Time

## 🔥 Calories

## 💡 Chef Tips
## 🥗 Nutrition Facts

- Calories:
- Protein:
- Carbohydrates:
- Fat:
- Fiber:
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const recipe = response.text || "";

    // Extract Recipe Name
    const recipeName =
      recipe
        .split("\n")
        .find((line) => line.startsWith("#"))
        ?.replace("#", "")
        ?.trim() || "Food";

    let imageUrl = "";

    try {
      const imageRes = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          recipeName
        )}&per_page=1`,
        {
          headers: {
            Authorization: process.env.PEXELS_API_KEY!,
          },
        }
      );

      const imageData = await imageRes.json();

      imageUrl = imageData.photos?.[0]?.src?.large || "";
    } catch (err) {
      console.log("Pexels Error:", err);
    }

    return Response.json({
      recipe,
      image: imageUrl,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return Response.json(
      {
        error: error?.message || "Failed to generate recipe",
      },
      {
        status: 500,
      }
    );
  }
}