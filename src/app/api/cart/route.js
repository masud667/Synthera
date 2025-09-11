import dbConnection from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

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

// GET cart items for a specific user by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const cartCollection = dbConnection("cartItems");

    if (!email) {
      return new Response(JSON.stringify({ cartItems: [] }), { status: 200 });
    }

    const cartItems = await cartCollection.find({ userEmail: email }).toArray();
    return new Response(JSON.stringify({ cartItems }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ cartItems: [], error: error.message }), { status: 500 });
  }
}

// DELETE a cart item by _id
export async function DELETE(req, { params }) {
  try {
    const { id } = params; 
    const cartCollection = dbConnection("cartItems");

    const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: !!result.deletedCount }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
