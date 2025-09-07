import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnetion from "./dbConnection";
import { loginUser } from "@/app/actions/auth/loginUser";

export const authOptions = {
  // Authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt", // session JWT diye manage hobe
    maxAge: 60 * 60 * 24, // 1 day
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // strong secret in .env
    encryption: true, // optional: encrypt JWT
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email: user_email, image, name } = user;
        const userCollection = dbConnetion("userCollection");
        const isExisted = await userCollection.findOne({ providerAccountId });
        if (!isExisted) {
          const payload = {
            providerAccountId,
            provider,
            user_email,
            image,
            name,
            role: "user",
          };
          await userCollection.insertOne(payload);
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // Login er somoy user thakle token e save korbo
      if (user) {
        token.id = user._id || user.id;
        token.role = user.role || "user";
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      // session e token thekle data attach korbo
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
