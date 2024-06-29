//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async (request) => {
  try {
    await CONNECT_db();
    const all_PROPERTIES = await Property.find({});
    if (!all_PROPERTIES) return new Response("Properties not found", { status: 404 });

    return new Response(JSON.stringify(all_PROPERTIES), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Soemthign went wrong...", { status: 500 });
  }
};
