import { Axios } from "@lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        const res = await Axios.get("admin");

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (
          res.data.result.map((data) => data.email).includes(email) &&
          res.data.result.map((data) => data.password).includes(password)
        ) {
          return {
            email: email,

            // role: res.data.result[0].role,
          };
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      const res = await Axios.get("admin");
      const role = res.data.result.find((d) => d.email === session.user?.email);
      const sessionData = {
        ...session,
        user: {
          ...session.user,
          role: role.role,
        },
      };
      return sessionData;
    },
  },

  theme: {
    colorScheme: "light",
  },
};
process.env.NODE_ENV !== "production";
export default NextAuth(authOptions);
