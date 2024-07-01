//
//
//

import Google from "next-auth/providers/google";
import CONNECT_db from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          promt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in.
    async signIn({ profile }) {
      await CONNECT_db();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        // Truncate the name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // 1. Get user from db
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id to the session
      session.user.id = user._id.toString();
      // 3. Return session object
      return session;
    },
  },
};
