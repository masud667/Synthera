import dbConnection from "@/lib/mongodb";

async function authenticate(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  return token === process.env.ADMIN_TOKEN;
}

export async function GET() {
  try {
    const db = await dbConnection();
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}

export async function POST(req) {
  const isAuth = await authenticate(req);
  if (!isAuth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const product = await req.json();

    if (!product.name || !product.price) {
      return new Response(JSON.stringify({ error: "Name and price are required" }), { status: 400 });
    }

    const db = await dbConnection();
    const result = await db.collection("products").insertOne(product);

    return new Response(JSON.stringify({ ...product, _id: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create product" }), { status: 500 });
  }
}
