import NextAuth from 'next-auth';
import connectDb from '@/mongo/driver';
import User from '@/mongo/models/User';
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  events: {
    async createUser({ user }) { // Destructure to fetch the user object
      await connectDb();

      // Check if user exists
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: user.id,
        });
        await newUser.save();
      }
    }
  },
});