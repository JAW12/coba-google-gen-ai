import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

async function main() {
    const model = ai.models.get({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
        model: model,
        contents: "Explain how AI works in a few words",
    });

    console.log(result.text);
}

await main();