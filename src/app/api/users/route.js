import { connectDB } from "@/lib/connectDB";

export async function GET(req) {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const users = await usersCollection
      .find({})
      .project({ password: 0 })
      .toArray();

    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
