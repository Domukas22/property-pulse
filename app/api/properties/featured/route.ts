//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";
import { describe } from "node:test";
import { type } from "os";
import { GET_sessionUser } from "@/utils/GET_sessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await CONNECT_db();

    const properties = await Property.find({ is_featured: true });

    if (!properties) return new Response("Properties not found", { status: 404 });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Soemthign went wrong...", { status: 500 });
  }
};
