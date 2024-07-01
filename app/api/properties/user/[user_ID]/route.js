//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/user/[user_ID]
export const GET = async (request, { params }) => {
  try {
    await CONNECT_db();

    const { user_ID } = params;

    if (!user_ID) return new Response("User id is required", { status: 400 });

    const user_PROPERTIES = await Property.find({ owner: user_ID });
    if (!user_PROPERTIES) return new Response("Properties not found", { status: 404 });

    return new Response(JSON.stringify(user_PROPERTIES), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Soemthign went wrong...", { status: 500 });
  }
};
