import dbConnection from "@/lib/dbConnection";

// Add to wishlist
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.userEmail || !body.productId) {
      console.log("Missing fields:", body);
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const wishlistCollection = await dbConnection("wishlistItems");

   
    const exists = await wishlistCollection.findOne({
      userEmail: body.userEmail,
      productId: body.productId,
    });

    if (exists) {
      return new Response(
        JSON.stringify({ success: false, message: "Item already in wishlist" }),
        { status: 400 }
      );
    }

    const result = await wishlistCollection.insertOne(body);

    if (result.insertedId) {
      return new Response(
        JSON.stringify({ success: true, message: "Added to wishlist" }),
        { status: 201 }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "Failed to add" }),
      { status: 500 }
    );
  } catch (err) {
    console.error("Wishlist POST error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

// Get wishlist items
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const wishlistCollection = await dbConnection("wishlistItems");

    if (!email) return new Response(JSON.stringify({ wishlistItems: [] }), { status: 200 });

    const wishlistItems = await wishlistCollection.find({ userEmail: email }).toArray();
    return new Response(JSON.stringify({ wishlistItems }), { status: 200 });
  } catch (err) {
    console.error("Wishlist GET error:", err);
    return new Response(JSON.stringify({ wishlistItems: [], error: err.message }), { status: 500 });
  }
}
