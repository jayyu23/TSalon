import { Int32 } from "mongodb";
import mongoose from "mongoose";
import tsalonmemberModel from "./tsalonmember.model";

const TSalonVoteSchema = new mongoose.Schema({
  member: {
    type: Array[tsalonmemberModel],
    default: [],
    required: "Vote count required",
  },
  TBSN: {
    type: Int32,
    required: "TBSN required",
  },
  numVotes: {
    type: Int32,
    required: "Number of Votes required",
  },
});

export default mongoose.model("TSalonVote", TSalonVoteSchema);
