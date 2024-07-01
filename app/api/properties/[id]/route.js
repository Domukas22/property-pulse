//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";
import { GET_sessionUser } from "@/utils/GET_sessionUser";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await CONNECT_db();
    const one_PROPERTY = await Property.findById(params.id);

    if (!one_PROPERTY) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(one_PROPERTY), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Soemthing went wrong...", { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const property_ID = params.id;
    const session_USER = await GET_sessionUser(request);

    if (!session_USER || !session_USER.user_ID)
      return new Response("User id is required. Unauthorized", { status: 401 });

    const { user_ID } = session_USER;
    await CONNECT_db();
    const one_PROPERTY = await Property.findById(property_ID);

    if (!one_PROPERTY) return new Response("Property not found", { status: 404 });
    // Verify ownership
    if (one_PROPERTY.owner.toString() !== user_ID)
      return new Response("Unauthorized. The property does not belong to the user.", {
        status: 401,
      });

    await one_PROPERTY.deleteOne();

    return new Response(`Property "${one_PROPERTY.name}" deleted`, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong... :(", { status: 500 });
  }
};
