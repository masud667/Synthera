"use server";
import dbConnection from "@/lib/dbConnection";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const userCollection = await dbConnection("userCollection");
  const { email, password } = payload;

  const user = await userCollection.findOne({ email });
  if (!user) return null;
  const isPasswordOK = await bcrypt.compare(password, user.password);
  if (!isPasswordOK) return null;

  return user;
};
