import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Keep history in memory (for demo; use DB/session store in production)
let conversationHistory = [];

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Fetch product catalog dynamically
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
      cache: "no-store",
    });

    const productsData = await res.json();
    const products = productsData.products || [];

    const productList = products
      .map(
        (p, i) =>
          `${i + 1}. ${p.title} ($${p.discountPrice || p.price}) - Sizes: ${
            p.sizes?.join(", ") || "N/A"
          }`
      )
      .join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Add full site info + rules
    const siteInfo = `
You are Synthera AI, the official shopping assistant for Synthera.
Website summary:
- Synthera is a modern e-commerce platform for clothes and outfits.
- Role-based access:
   • Users can browse and purchase products.
   • Must need login to visit dashboard route.
   • Sellers can register to sell products:
       - Go to the "Become a Seller" page.
       - Fill out the registration form.
       - Submit the seller request.
       - Admin will review and approve the request.
       - Once approved, sellers can add and sell products.
   • Admins manage users, sellers, and product approvals.
- The site provides high-quality clothing for men and women.
- Buyers can easily search, view, and order products with different sizes, colors, and discounts.

Rules:
1. If the user greets (hi/hello), reply with a warm greeting + “How can I help you today?”
2. If the user asks about "Synthera" or "this website", always explain the site using the summary above.
3. If the user asks how to sell their own products, give step-by-step instructions above.
4. If the user asks about products, answer based on the catalog below.
5. If the user follows up with "what sizes?" or "what price?" after you mentioned a product, use the last mentioned product from your own response as context.
6. Never dump all product details unless the user asks. Start by naming products, then let the user ask for details (sizes, colors, price, etc.).
7. Never say "I don't know". If unsure, politely redirect to helpful info.

Product catalog:
${productList}
`;

    // Append new user message
    conversationHistory.push({ role: "user", content: message });

    // Format full conversation
    const formattedConversation = conversationHistory
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
      .join("\n");

    const prompt = `
${siteInfo}

Conversation so far:
${formattedConversation}

AI:
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Save AI response
    conversationHistory.push({ role: "ai", content: text });

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (error) {
    console.error("Error in AI API:", error);
    return new Response(
      JSON.stringify({ error: "Oops! Something went wrong." }),
      { status: 500 }
    );
  }
}
