import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/connectDB";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectDB();
        const usersCollection = db.collection("users");

        // Find the user by email
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        // Return user object (will be stored in JWT)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
   async signIn({ user, account }) {
  try {
    if (account.provider === "google") {
      const db = await connectDB();
      const usersCollection = db.collection("users");
      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        const result = await usersCollection.insertOne({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
          createdAt: new Date(),
          provider: "google",
        });
        user.id = result.insertedId.toString();
      } else {
        user.id = existingUser._id.toString();
        user.role = existingUser.role;
      }
    }
    return true;
  } catch (err) {
    console.error("Google signIn error:", err);
    return false;
  }
},

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/(authentication)/login", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
