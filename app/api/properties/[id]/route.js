//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";

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
