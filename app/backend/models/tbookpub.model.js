import { Int32 } from "mongodb";
import mongoose from "mongoose";

// TBSN: TBook Serial Number, starts from 75000
const TBookPubSchema = new mongoose.Schema({
  TBSN: {
    type: Int32,
    unique: "TBSN must be unique",
    required: "TBook Serial Number (TBSN) is required",
  },
  author: { type: String, required: "Author is required" },
  blurb: { type: String },
  content: { type: String, required: "Content is required" },
  publishDate: { type: Date },
  coverImage: { type: String, default: "assets/logo_square_blue.png" },
});

export default mongoose.model("TBookPub", TBookPubSchema);
