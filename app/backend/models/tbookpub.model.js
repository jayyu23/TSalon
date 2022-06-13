import mongoose from "mongoose";
import autoIncrementTBSN from "./tbsn.model.js";

// TBSN: TBook Serial Number, starts from 75000
const TBookPubSchema = new mongoose.Schema({
  tbsn: {
    type: Number,
    unique: "TBSN must be unique",
    required: "TBook Serial Number (TBSN) is required",
  },
  title: { type: String, required: "Title is required" },
  author: { type: String, required: "Author is required" },
  blurb: { type: String },
  content: { type: String, required: "Content is required" },
  publishDate: { type: Date, default: new Date() },
  coverImage: { type: String, default: "assets/logo_square_blue.png" },
});

TBookPubSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementTBSN("TBookPub", this, next);
});

export default mongoose.model("TBookPub", TBookPubSchema);
