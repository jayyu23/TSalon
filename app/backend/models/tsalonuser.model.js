import mongoose from "mongoose";

const TSalonUserSchema = mongoose.Schema({
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
  hashedPassword: {
    type: String,
    default: null,
  },
  member: {
    type: Boolean,
    default: false,
  },
  tbooksPublished: {
    type: [Number],
    default: [],
  },
  tbooksCollected: {
    type: [Number],
    default: [],
  },
  tbooksDrafted: {
    type: [Number],
    default: [],
  },
  dailyVotes: {
    type: Number,
    default: 10,
  },
  votesUsed: {
    type: Number,
    default: 0,
  },
  lastVoted: {
    type: Date,
  },
  greenTokens: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("TSalonUser", TSalonUserSchema);
