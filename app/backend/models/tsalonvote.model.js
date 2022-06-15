import mongoose from "mongoose";

const TSalonVoteSchema = new mongoose.Schema({
  member: {
    type: [String],
    default: [],
    required: "Vote count required",
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
