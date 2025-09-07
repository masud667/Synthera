import dbConnection from "@/lib/dbConnection";

async function authenticate(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  return token === process.env.ADMIN_TOKEN;
}

export async function POST(req) {
  try {
    const product = await req.json();

    if (!product.title || !product.price) {
      return new Response(JSON.stringify({ error: "Title and price required" }), { status: 400 });
    }

    const productsCollection = await dbConnection("products"); // already collection
    const result = await productsCollection.insertOne(product);

    return new Response(JSON.stringify({ ...product, _id: result.insertedId }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create product" }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const productsCollection = await dbConnection("products"); 
    const products = await productsCollection.find({}).toArray();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}

