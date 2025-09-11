import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Role-based access
  if (session.user.role !== "admin" && session.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden: Only admin or seller allowed" });
  }

  res.status(200).json({ message: "Welcome to seller/admin route", user: session.user });
}
