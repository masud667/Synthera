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
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const minPrice = parseInt(searchParams.get("minPrice")) || 0;
    const maxPrice = parseInt(searchParams.get("maxPrice")) || 1000000;
    const sort = searchParams.get("sort") || "default";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 8;

    const productsCollection = await dbConnection("products");

    // Build MongoDB filter
    const query = {
      price: { $gte: minPrice, $lte: maxPrice },
      ...(search ? { title: { $regex: search, $options: "i" } } : {}),
      ...(category ? { category } : {}),
    };

    // Sorting
    let sortOption = {};
    if (sort === "price-low") sortOption = { price: 1 };
    if (sort === "price-high") sortOption = { price: -1 };
    if (sort === "name") sortOption = { title: 1 };

    const totalCount = await productsCollection.countDocuments(query);

    const products = await productsCollection
      .find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return new Response(
      JSON.stringify({
        products,
        totalPages: Math.ceil(totalCount / limit),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}

