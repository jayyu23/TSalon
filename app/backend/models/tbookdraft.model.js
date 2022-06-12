import mongoose from "mongoose";
import tsalonvoteModel from "./tsalonvote.model";

const TBookDraftSchema = new mongoose.Schema({
  // TSBN Starts at 75000
  tbsn: {
    type: Number,
    unique: "TBSN must be unique",
    required: "TBook Serial Number (TBSN) is required",
  },
  author: { type: String, required: "Author is required" },
  blurb: { type: String },
  content: { type: String, required: "Content is required" },
  publishDate: { type: Date },
  coverImage: { type: String, default: "assets/logo_square_blue.png" },
  numVotes: { type: Number, default: 0 },
  voters: { type: [tsalonvoteModel.Schema] },
});

export default mongoose.model("TBookDraft", TBookDraftSchema);
