import dbConnection from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json(); 
    if (!body.userEmail || !body.productId) {
      return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
    }

    const wishlistCollection = dbConnection("wishlistItems");

    // Check if item already exists
    const exists = await wishlistCollection.findOne({
      userEmail: body.userEmail,
      productId: body.productId,
    });

    if (exists) {
      return new Response(JSON.stringify({ success: false, message: "Item already in wishlist" }), { status: 400 });
    }

    const result = await wishlistCollection.insertOne(body);

    if (result.insertedId) {
      return new Response(JSON.stringify({ success: true, message: "Added to wishlist" }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Failed to add" }), { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), { status: 500 });
  }
}

// ✅ Fetch wishlist items by user email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const wishlistCollection = dbConnection("wishlistItems");

    if (!email) {
      return new Response(JSON.stringify({ wishlistItems: [] }), { status: 200 });
    }

    const wishlistItems = await wishlistCollection.find({ userEmail: email }).toArray();

    return new Response(JSON.stringify({ wishlistItems }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ wishlistItems: [], error: error.message }), { status: 500 });
  }
}

// ✅ Delete wishlist item by _id
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const wishlistCollection = dbConnection("wishlistItems");

    const result = await wishlistCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: !!result.deletedCount }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
