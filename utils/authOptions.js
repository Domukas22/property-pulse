//
//
//

import Google from "next-auth/providers/google";

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
      // 1. connect ot db
      // 2. check if user exists
      // 3. if not, create user
      // 4. return true to allow sign in
    },
    // Modifies teh session object
    async session({ session }) {
      // 1. Get user from db
      // 2. Assign user id to the session
      // 3. Return session object
    },
  },
};
