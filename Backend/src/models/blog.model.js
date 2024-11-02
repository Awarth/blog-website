import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    picture: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: "string",
      required: "true",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
