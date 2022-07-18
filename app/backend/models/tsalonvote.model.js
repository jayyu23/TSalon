import mongoose from "mongoose";

const TSalonVoteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username required",
  },
  address: {
    type: String,
    required: "Wallet required",
  },
  tbsn: {
    type: Number,
    required: "TBSN required",
  },
  numVotes: {
    type: Number,
    required: "Number of Votes required",
  },
});

export default mongoose.model("TSalonVote", TSalonVoteSchema);
