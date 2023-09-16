import NextAuth from 'next-auth';
import connectDb from '@/mongo/driver';
import User from '@/mongo/models/User';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';



export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "********" }
      },
      //@ts-ignore
      async authorize(credentials, req) {
        connectDb();
        const foundUser = await User.findOne({ email: credentials?.username });
        // console.log(foundUser);

        // console.log(credentials?.password);
        

  
        if (foundUser && credentials?.password !== undefined && await compare(credentials?.password, foundUser?.password)) {
          // Return the user object, but make sure not to return the hashed password
          const { password, ...userWithoutPassword } = foundUser.toObject();
          return userWithoutPassword;
      } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks:{
    async session({session, user}) {
      session.user?.name // adjust based on your schema
      return session;
  },
  }
});