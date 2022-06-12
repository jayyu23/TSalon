import mongoose from "mongoose";
import tsalonmemberModel from "./tsalonmember.model.js";

const TSalonVoteSchema = new mongoose.Schema({
  member: {
    type: [tsalonmemberModel.schema],
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
