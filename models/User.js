//
//
//

import { Schema, model, models } from "mongoose";

const User_SCHEMA = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", User_SCHEMA); // the "||" operator in case the model already exists

export default User;
