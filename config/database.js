//
//
//

import mongoose from "mongoose";

let connected = false;

export default async function CONNECT_db() {
  mongoose.set("strictQuery", true); // only fields that we have specified in the schema can be saved in our database

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
  }
}
