//
//
//

import CONNECT_db from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { GET_sessionUser } from "@/utils/GET_sessionUser";

// fixing an issue with ssr for this specific route
export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await CONNECT_db();

    const { property_ID } = await request.json();
    const session_USER = await GET_sessionUser();

    if (!session_USER || !session_USER.user_ID)
      return new Response("User id is required", { status: 401 });

    const { user_ID } = session_USER;

    // Find user in datasbe
    const user = await User.findById(user_ID);

    // Check if property is bookmarked
    let IS_bookmarked = user.bookmarks.includes(property_ID);

    let message;

    if (IS_bookmarked) {
      // Remove bookmark
      user.bookmarks.pull(property_ID);
      message = "Property removed from bookmarks";
      IS_bookmarked = false;
    } else {
      // Add bookmark
      user.bookmarks.push(property_ID);
      message = "Property added to bookmarks";
      IS_bookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, IS_bookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong... :(", { status: 500 });
  }
};

// GET /api/bookmarks
export const GET = async (request) => {
  try {
    await CONNECT_db();

    const session_USER = await GET_sessionUser();

    if (!session_USER || !session_USER.user_ID)
      return new Response("User id is required", { status: 401 });

    const { user_ID } = session_USER;

    // Find user in datasbe
    const user = await User.findById(user_ID);

    // Find all bookmarked properties
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong... :(", { status: 500 });
  }
};
