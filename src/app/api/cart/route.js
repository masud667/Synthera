import dbConnection from "@/lib/dbConnection";

// Add to cart
export async function POST(req) {
  try {
    const body = await req.json();
    const cartCollection = await dbConnection("cartItems");

    const result = await cartCollection.insertOne({
      ...body,
      addedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (error) {
    console.error("Cart POST error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

// Get cart items by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const cartCollection = await dbConnection("cartItems");

    if (!email) {
      return new Response(JSON.stringify({ cartItems: [] }), { status: 200 });
    }

    const cartItems = await cartCollection.find({ userEmail: email }).toArray();
    return new Response(JSON.stringify({ cartItems }), { status: 200 });
  } catch (error) {
    console.error("Cart GET error:", error);
    return new Response(JSON.stringify({ cartItems: [], error: error.message }), { status: 500 });
  }
}
