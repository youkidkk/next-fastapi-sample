import axios from "axios";
import FormData from "form-data";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const url = "http://localhost:8000/api/auth/signin";
        if (!credentials) {
          return null;
        }
        try {
          const data = new FormData();
          data.append("username", credentials?.username);
          data.append("password", credentials?.password);
          const res = await axios.post(url, data);
          return res.data.access_token;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {},
  debug: process.env.NODE_ENV === "development",
});
