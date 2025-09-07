"use server";


import dbConnetion from "@/lib/dbConnection";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  const userCollections = await dbConnetion("userCollection");
  console.log(userCollections);
  const { email, password } = payload;
  if (!email) return null;

  const user = await userCollections.findOne({ email: payload.email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    const result = await userCollections.insertOne(payload);
    console.log(result);
    const { acknowledged, insertedId } = result;
    return { acknowledged, insertedId: insertedId.toString() };
  }
  return null;
};
