import dbConnection from "@/lib/dbConnection";

export async function POST(req) {
  try {
    const body = await req.json();
    const cartCollection = dbConnection("cartItems");

    const result = await cartCollection.insertOne({
      ...body,
      addedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, result }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
