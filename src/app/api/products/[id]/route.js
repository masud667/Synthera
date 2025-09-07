import dbConnection from "@/lib/dbConnection";
import { ObjectId } from "mongodb";

async function authenticate(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  return token === process.env.ADMIN_TOKEN;
}

// GET /api/products/:id
export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id))
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const db = await dbConnection("products"); // returns collection directly
    const product = await db.findOne({ _id: new ObjectId(id) });

    if (!product)
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}

// PUT /api/products/:id
export async function PUT(req, { params }) {
  const isAuth = await authenticate(req);
  if (!isAuth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const { id } = params;

    if (!ObjectId.isValid(id))
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const updatedData = await req.json();
    const db = await dbConnection("products"); // returns collection
    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}

// DELETE /api/products/:id
export async function DELETE(req, { params }) {
  const isAuth = await authenticate(req);
  if (!isAuth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const { id } = params;

    if (!ObjectId.isValid(id))
      return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });

    const db = await dbConnection("products"); // returns collection
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}
