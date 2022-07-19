import tbookdraftModel from "../models/tbookdraft.model.js";
import tsalonvoteModel from "../models/tsalonvote.model.js";
import extend from "lodash/extend.js";
import tsalonuserModel from "../models/tsalonuser.model.js";
import mongoose from "mongoose";
import pkg from 'lodash';
const { map } = pkg;

const getReview = (req, res) => {
  // Get the user's vote num
  let username = req.body.username;
  tsalonuserModel.findOne({ username: username }).exec().then((acc) => {
    let today = new Date()
    let lastVotedDate = acc.lastVoted
    let currentVotes = acc.dailyVotes - acc.votesUsed;
    // Refresh votes
    if (today >= lastVotedDate && today.toLocaleDateString() != lastVotedDate.toLocaleDateString()) {
      currentVotes = acc.dailyVotes;
      tsalonuserModel.findOneAndUpdate({ username: username }, { votesUsed: 0, lastVoted: today }).exec();
    }
    // First get all the articles that review=true
    tbookdraftModel
      .find({ review: true })
      .sort({ lastReviewDate: 1 })
      .exec()
      .then(
        (acc) => {
          let reviewDraft = null;
          // iterate until we find one that is suitable
          for (let i = 0; i < acc.length; i++) {
            let draft = acc[i];
            let voters = map(draft.voters, "voter");

            if (draft.author != username && !voters.includes(username)) {


              reviewDraft = draft;
              break;
            }
          }
          // nothing to review
          if (reviewDraft == null) {
            res.status(200).json({ success: true, reviewDraft: null, currentVotes: currentVotes });
          } else {
            // otherwise update the model
            tbookdraftModel
              .updateOne(
                { tbsn: reviewDraft.tbsn },
                {
                  $set: {
                    lastReviewDate: new Date(),
                  },
                }
              )
              .then(
                (acc) => {
                  res
                    .status(200)
                    .json({ success: true, reviewDraft: reviewDraft, currentVotes: currentVotes });
                },
                (rej) => {
                  res.status(400).json({ success: false });
                }
              );
          }
        },
        (rej) => {
          res.status(400).json({ success: false });
        }
      );
  }, (rej) => { })
};

const submitVote = (req, res) => {
  let votes = req.body.votes;
  let username = req.body.username;
  let address = req.body.walletAddress;
  let tbsn = req.body.tbsn;
  let comment = req.body.comments
  let voteDate = new Date();

  tsalonvoteModel.create({ voter: username, address: address, tbsn: tbsn, numVotes: votes, date: voteDate, comment: comment }).then((acc) => {
    let newVote = acc;
    // update user
    tsalonuserModel.findOneAndUpdate({ username: username }, { $set: { lastVotedDate: new Date() }, $inc: { votesUsed: votes } }).exec();
    tbookdraftModel.updateOne({ tbsn: tbsn }, { $push: { voters: newVote }, $inc: { numVotes: votes } }).then((acc) => {
      // check if ready for publish
      res.status(200).json({ success: true, published: false, draft: acc, vote: newVote })
    }, (rej) => { res.status(400).json({ success: false, error: rej }) })
  }, (rej) => {
    console.log(rej)
    res.status(400).json({ success: false })
  })

}

const passThreshold = (tbsn) => {
  // If the number of votes > 10, then allow publcation
  const voteThreshold = 10;
  tbookdraftModel.find({ tbsn: tbsn }).exec().then((acc) => {
    if (acc.numVotes >= voteThreshold) {
      return true;
    } else {
      return false;
    }
  }, (rej) => {
    return false;
  })
  return true;
}

export default { getReview: getReview, passThreshold: passThreshold, submitVote: submitVote };
