import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
