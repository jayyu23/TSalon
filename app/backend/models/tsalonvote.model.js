import mongoose from "mongoose";

const TSalonVoteSchema = new mongoose.Schema({
  voter: {
    type: String,
    required: "Username required",
  },
  address: {
    type: String,
    required: "Wallet required",
  },
  comment: {
    type: String,
  },
  tbsn: {
    type: Number,
    required: "TBSN required",
  },
  numVotes: {
    type: Number,
    required: "Number of Votes required",
  },
  date: {
    type: Date,
    required: "Date required",
  }
});

export default mongoose.model("TSalonVote", TSalonVoteSchema);
