///
//
//

import CONNECT_db from "@/config/database";
import Message from "@/models/Message";
import { GET_sessionUser } from "@/utils/GET_sessionUser";
import { send } from "process";

export const dynamic = "force-dynamic";

// GET /api/messages
export const GET = async (req) => {
  try {
    await CONNECT_db();
    const session_USER = await GET_sessionUser();

    if (!session_USER) {
      return new Response(JSON.stringify("User ID is required"), { status: 401 });
    }

    const messages = await Message.find({ recipient: session_USER.user_ID })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Couldn't get messages..." }), { status: 500 });
  }
};

// POST /api/messages
export const POST = async (req) => {
  try {
    await CONNECT_db();

    const { name, email, phone, message, recipient, property } = await req.json();

    const session_USER = await GET_sessionUser();

    if (!session_USER) {
      return new Response(
        JSON.stringify({ message: "You must log be logged in to send a message" }),
        {
          status: 401,
        }
      );
    }

    // Can not send message to self
    if (session_USER.user_ID === recipient) {
      return new Response(JSON.stringify({ message: "Cannot send message to yourself" }), {
        status: 400,
      });
    }

    const new_MESSAGE = new Message({
      sender: session_USER.user_ID,
      recipient,
      name,
      property,
      email,
      phone,
      message,
    });

    console.log(new_MESSAGE);

    await new_MESSAGE.save();

    return new Response(JSON.stringify({ message: "Message sent" }), { status: 200 });
    // -----------------------------------
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong... :(" }), { status: 500 });
  }
};
