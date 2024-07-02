//
//
//

import Message from "@/models/Message";
import CONNECT_db from "@/config/database";
import { GET_sessionUser } from "@/utils/GET_sessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async () => {
  try {
    await CONNECT_db();
    const session_USER = await GET_sessionUser();

    if (!session_USER) {
      return new Response("User ID is required", { status: 401 });
    }

    const unreadMessage_COUNT = await Message.countDocuments({
      recipient: session_USER.user_ID,
      read: false,
    });

    return new Response(JSON.stringify(unreadMessage_COUNT), { status: 200 });
    // ------------------------------------------------
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
