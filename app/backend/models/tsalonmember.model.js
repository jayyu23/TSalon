import { Int32 } from "mongodb";
import mongoose from "mongoose";
import tbookdraftModel from "./tbookdraft.model";
import tbookpubModel from "./tbookpub.model";

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
    type: Array[tbookpubModel],
    default: [],
  },
  tbooksCollected: {
    type: Array[tbookpubModel],
    default: [],
  },
  tbooksDrafted: {
    type: Array[tbookdraftModel],
    default: [],
  },
  dailyVotes: {
    type: Int32,
    default: 10,
  },
  currentVotes: {
    type: Int32,
    default: 10,
  },
  greenTokens: {
    type: Int32,
    default: 0,
  },
});

export default mongoose.model("TSalonMember", TSalonMemberSchema);
