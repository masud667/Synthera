import dbConnection from "@/lib/dbConnection";


export async function POST(req) {
  try {
    const body = await req.json(); // get data from client
    if (!body.userEmail || !body.productId) {
      return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
    }

    // Create collection for wishlist
    const wishlistCollection = dbConnection("wishlistItems");

    //  check if items already exists
    const exists = await wishlistCollection.findOne({
      userEmail: body.userEmail,
      productId: body.productId,
    });

    if (exists) {
      return new Response(JSON.stringify({ success: false, message: "Item already in wishlist" }), { status: 400 });
    }

    // Insert into collection
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
