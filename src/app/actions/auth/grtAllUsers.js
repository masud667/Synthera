import dbConnetion from "@/lib/dbConnection";


export async function getAllUsers() {
  try {
    const usersCollection = dbConnetion("users"); // "users" is your collection name
    const users = await usersCollection.find({}).toArray();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}
