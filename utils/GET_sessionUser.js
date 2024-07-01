//
//
//

import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET_sessionUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) return null;

    return {
      user_ID: session.user.id,
      email: session.user.email,
      username: session.user.username,
      image: session.user.image,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
