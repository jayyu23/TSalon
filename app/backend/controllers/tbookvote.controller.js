import tbookModel from "../models/tbook.model.js";
import tsalonvoteModel from "../models/tsalonvote.model.js";
import extend from "lodash/extend.js";
import tsalonuserModel from "../models/tsalonuser.model.js";
import blockchainController from "../controllers/blockchain.controller.js"
import mongoose from "mongoose";
import pkg from 'lodash';
import tsalonmessageController from "./tsalonmessage.controller.js";
const { map } = pkg;

const voteThreshold = 10;

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
    tbookModel
      .find({ stage: "review" })
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
            tbookModel
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
                    .json({ success: true, reviewDraft: reviewDraft, currentVotes: currentVotes, voteThreshold: voteThreshold });
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
    tsalonuserModel.findOneAndUpdate({ username: username }, { lastVoted: new Date(), $inc: { votesUsed: votes } }, { returnDocument: true, returnOriginal: false }).exec().then(
      (acc) => { console.log(acc) }, (rej) => { console.log(rej) });

    tbookModel.findOneAndUpdate({ tbsn: tbsn }, { $push: { voters: newVote }, $inc: { numVotes: votes, numViews: 1 } }, { returnDocument: true, returnOriginal: false }).then((acc) => {
      tsalonmessageController.logMessage(acc.author, username, `#${tbsn} Peer Review`, `Comments: ${comment} | Votes earned: ${votes}`, new Date());

      // check if ready for publish
      passThreshold(tbsn).then((pass) => {
        if (pass) {

          tsalonmessageController.logMessage(acc.author, "TSalon", `#${tbsn} Published!`, `Congratulations! Your writing \"${acc.title}\" has passed peer review and been published as TBook #${tbsn}. 
          As the author, you will receive a free mint of the NFT. Users can view this TBook publicly at tsalon.io/view/${tbsn}`, new Date())
          // console.log(`TBSN: ${tbsn} has passed publication threshold`);
          tbookModel.findOneAndUpdate({ tbsn: tbsn }, { stage: "publish" }).exec().then((acc) => {
            blockchainController.publish(tbsn); // run this async
          }, (rej) => { console.log(rej) }); // update the stage data and then publish onto the blockchain
          // notify the author
          res.status(200).json({ success: true, published: true, draft: acc, vote: newVote })
        } else {
          // console.log("Did not pass vote threshold")
          res.status(200).json({ success: true, published: false, draft: acc, vote: newVote })
        }
      })
    }, (rej) => { res.status(400).json({ success: false, error: rej }) })
  }, (rej) => {
    console.log(rej)
    res.status(400).json({ success: false })
  })

}

const passThreshold = async (tbsn) => {
  // If the number of votes > 10, then allow publcation
  let result = await tbookModel.findOne({ tbsn: tbsn }).exec()
  if (result && result.numVotes >= voteThreshold) {
    return true
  } else {
    return false
  }

}

export default { getReview: getReview, passThreshold: passThreshold, submitVote: submitVote };
