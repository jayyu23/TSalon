import { Int32 } from "mongodb";
import mongoose from "mongoose";
import tbookdraftModel from "./tbookdraft.model.js";
import tbookpubModel from "./tbookpub.model.js";

const TSalonMemberSchema = mongoose.Schema({
  username: {
    type: String,
    unique: "Username must be unique",
    required: "Username is required",
  },
  walletAddress: {
    type: String,
    unique: "Wallet address must be unique",
    required: "Wallet address is required",
  },
  active: {
    type: Boolean,
    default: true,
  },
  tbooksPublished: {
    type: [tbookpubModel.schema],
    default: [],
  },
  tbooksCollected: {
    type: [tbookpubModel.schema],
    default: [],
  },
  tbooksDrafted: {
    type: [tbookdraftModel.schema],
    default: [],
  },
  dailyVotes: {
    type: Number,
    default: 10,
  },
  currentVotes: {
    type: Number,
    default: 10,
  },
  greenTokens: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("TSalonMember", TSalonMemberSchema);
