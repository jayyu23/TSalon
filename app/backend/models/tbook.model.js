import mongoose from "mongoose";
import tsalonvoteModel from "./tsalonvote.model.js";
import autoIncrementTBSN from "./tbsn.model.js";

const TBookDraftSchema = new mongoose.Schema({
  // TSBN Starts at 75000
  tbsn: {
    type: Number,
    unique: "TBSN must be unique",
    required: "TBook Serial Number (TBSN) is required",
  },
  author: { type: String, required: "Author is required" },
  title: { type: String },
  blurb: { type: String },
  content: { type: String },
  createDate: { type: Date, default: new Date() },
  lastSaveDate: { type: Date, default: new Date() },
  coverImage: { type: String },
  stage: { type: String, default: "draft" }, // draft, review, publish
  pubMode: { type: String },
  reviewDate: { type: Date },
  lastReviewDate: { type: Date },
  numVotes: { type: Number, default: 0 },
  numViews: { type: Number, default: 0 },
  voters: { type: [tsalonvoteModel.Schema] },
});

TBookDraftSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementTBSN("TBookPub", this, next);
});

export default mongoose.model("TBookDraft", TBookDraftSchema);
