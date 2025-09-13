import dbConnection from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const wishlistCollection = await dbConnection("wishlistItems");

    const result = await wishlistCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: !!result.deletedCount }), { status: 200 });
  } catch (err) {
    console.error("Wishlist DELETE error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
