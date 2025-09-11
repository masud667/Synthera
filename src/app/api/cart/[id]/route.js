import dbConnection from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const cartCollection = await dbConnection("cartItems");

    const result = await cartCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({
        success: !!result.deletedCount,
        message: result.deletedCount ? "Removed from cart" : "Item not found",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
