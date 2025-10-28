import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { getClient } from "@/lib/dbConnect";



export const authOptions = {
    
    adapter: MongoDBAdapter(await getClient()), 
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.NODEMAILER_EMAIL_ID,
          pass: process.env.NODEMAILER_EMAIL_PASSWORD,
        },
      },
      from: process.env.NODEMAILER_EMAIL_ID,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  

  pages: {
    signIn: "/signin", // optional custom sign-in page
  },

  secret: process.env.NEXTAUTH_SECRET,
};
