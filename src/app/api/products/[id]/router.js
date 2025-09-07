import dbConnection from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function authenticate(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  return token === process.env.ADMIN_TOKEN;
}

export async function GET(req) {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const db = await dbConnection();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify(product), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}

export async function PUT(req) {
  const isAuth = await authenticate(req);
  if (!isAuth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const updatedData = await req.json();
    const db = await dbConnection();
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}

export async function DELETE(req) {
  const isAuth = await authenticate(req);
  if (!isAuth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const db = await dbConnection();
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}
