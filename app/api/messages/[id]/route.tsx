//
//
//

// if you are doing somethign with the message, do ===> return new Response(JSON.stringify("Message you will use..."), { status: xxx });
// else ===> return new Response(JSON.stringify("Message you wont use..."), { status: xxx });

import Message from "@/models/Message";
import CONNECT_db from "@/config/database";
import { GET_sessionUser } from "@/utils/GET_sessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (req, { params }) => {
  try {
    await CONNECT_db();
    const { id } = params;
    const session_USER = await GET_sessionUser();

    if (!session_USER) {
      return new Response("User ID is required", { status: 401 });
    }

    const message = await Message.findById(id);

    if (!message) return new Response("Message Not Found", { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== session_USER.user_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Update message to read/unread depending on current status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
    // ------------------------------------------------
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE /api/messages/:id
export const DELETE = async (req, { params }) => {
  try {
    await CONNECT_db();
    const { id } = params;
    const session_USER = await GET_sessionUser();

    if (!session_USER) {
      return new Response("User ID is required", { status: 401 });
    }

    const message = await Message.findById(id);

    if (!message) return new Response("Message Not Found", { status: 404 });

    // Verify ownership
    if (message.recipient.toString() !== session_USER.user_ID) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message deleted", { status: 200 });
    // ------------------------------------------------
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
