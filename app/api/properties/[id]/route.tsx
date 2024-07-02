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

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await CONNECT_db();

    const session_USER = await GET_sessionUser();
    if (!session_USER || !session_USER.user_ID)
      return new Response("User id is required", { status: 401 });

    const { id } = params;
    const { user_ID } = session_USER;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existing_PROPERTY = await Property.findById(id);
    if (!existing_PROPERTY) return new Response("Property not found", { status: 404 });

    // Verify ownership
    if (existing_PROPERTY.owner.toString() !== user_ID)
      return new Response("Unauthorized. The property does not belong to the user.", {
        status: 401,
      });

    const property_DATA = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),

      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: Number(formData.get("beds")),
      baths: Number(formData.get("baths")),
      square_feet: Number(formData.get("square_feet")),
      amenities,
      rates: {
        nightly: Number(formData.get("rates.nightly")),
        weekly: Number(formData.get("rates.weekly")),
        monthly: Number(formData.get("rates.monthly")),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: user_ID,
    };

    // Update property in database
    const updated_PROPERTY = await Property.findByIdAndUpdate(id, property_DATA);

    return new Response(JSON.stringify(updated_PROPERTY), { status: 200 });
    //
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong... :(", { status: 500 });
  }
};
