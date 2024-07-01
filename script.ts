import mongoose from "mongoose";
import CONNECT_db from "@/config/database";

const dropIndex = async () => {
  await CONNECT_db();
  console.log("MongoDB connected...");

  // Drop the unique index on the username field
  const result = await mongoose.connection.collection("users").dropIndex("username_1");
  console.log("Index dropped:", result);

  // Close the database connection
  mongoose.connection.close();
};

// Run the script
dropIndex().catch((err) => {
  console.error("Error dropping index:", err);
  mongoose.connection.close();
});
