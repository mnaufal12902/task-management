import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;
        const urlAuth = "http://localhost:4000/auth";

        try {
          const response = await axios.post(urlAuth, {
            Username: username,
            Pass: password,
          });

          const user = response.data.user;

          if (response.data.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error)
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
