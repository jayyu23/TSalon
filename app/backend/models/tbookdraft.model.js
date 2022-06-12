import { Int32 } from "mongodb";
import mongoose, { Mongoose } from "mongoose";

const TBookDraftSchema = new mongoose.Schema({
  // TSBN Starts at 75000
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
  numVotes: { type: Int32, default: 0 },
  voters: { type: Array },
});

export default mongoose.model("TBookDraft", TBookDraftSchema);
