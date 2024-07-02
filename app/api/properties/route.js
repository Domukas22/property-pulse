//
//
//

import CONNECT_db from "@/config/database";
import Property from "@/models/Property";
import { describe } from "node:test";
import { type } from "os";
import { GET_sessionUser } from "@/utils/GET_sessionUser";
import cloudinary from "@/config/cloudinary";

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

// POST /api/properties
export const POST = async (request) => {
  try {
    await CONNECT_db();

    const session_USER = await GET_sessionUser();
    if (!session_USER || !session_USER.user_ID)
      return new Response("User id is required", { status: 401 });
    const { user_ID } = session_USER;

    const formData = await request.formData();
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((image) => image.name !== "");

    const propertyData = {
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

    // Upload images to Cloudinary
    const imagesUpload_PROMISES = [];

    for (const image of images) {
      // Turn image into a format that can be processed / uploaded to Cloudinary
      const image_BUFFER = await image.arrayBuffer();
      const image_ARRAY = Array.from(new Uint8Array(image_BUFFER));
      const image_DATA = Buffer.from(image_ARRAY);

      // convert the image data to base64
      const image_BASE64 = image_DATA.toString("base64");

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(`data:image/png;base64,${image_BASE64}`, {
        folder: "propertypulse",
      });

      imagesUpload_PROMISES.push(result.secure_url);

      // Wait for all images to upload
      const imagesUpload_RESULTS = await Promise.all(imagesUpload_PROMISES);

      // Add the images to the property data object
      propertyData.images = imagesUpload_RESULTS;
    }

    const new_PROPERTY = new Property(propertyData);
    await new_PROPERTY.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${new_PROPERTY._id}`, 303);
  } catch (error) {
    console.log(error);
    return new Response("Soemthign went wrong...", { status: 500 });
  }
};
