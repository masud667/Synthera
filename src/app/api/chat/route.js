import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are Synthera AI, an AI shopping assistant for an e-commerce site.
    Always answer in a friendly and helpful way.
    Here are example products:
    1. Men's Casual Jacket ($69.99)
    2. Women's Elegant Dress ($89.99)
    3. Unisex Hoodie ($49.99)
    
    Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (error) {
    console.error("Error in AI API:", error);
    return new Response(JSON.stringify({ error: "Oops! Something went wrong." }), { status: 500 });
  }
}
