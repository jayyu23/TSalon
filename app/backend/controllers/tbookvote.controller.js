import tbookdraftModel from "../models/tbookdraft.model.js";
import tsalonvoteModel from "../models/tsalonvote.model.js";
import extend from "lodash/extend.js";

const getReview = (req, res) => {
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
          let username = req.body.username;
          if (draft.author != username) {
            reviewDraft = draft;
            break;
          }
        }
        // nothing to review
        if (reviewDraft == null) {
          res.status(200).json({ success: true, reviewDraft: null });
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
                  .json({ success: true, reviewDraft: reviewDraft });
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
};

const recordVotes = (req, res, next) => {
  let votes = req.body.votes;
  let username = req.body.username;
  let address = req.body.walletAddress;
  let tbsn = req.body.tbsn;

  tsalonvoteModel.create({ username: username, address: address, tbsn: tbsn, numVotes: votes }).then((acc) => {
    let newVote = acc;
    tbookdraftModel.updateOne({ tbsn: tbsn }, { $push: { voters: newVote }, $inc: { numVotes: votes } }).then((acc) => {
      // check if ready for publish
      res.status(200).json({ success: true, draft: acc, vote: newVote })
    }, (rej) => { res.status(400).json({ success: false, error: rej }) })
  }, (rej) => { res.status(400).json({ success: false }) })

}

const passThreshold = (tbsn) => {
  // If the number of votes > 10, then allow publcation
  let voteThreshold = 10;
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

export default { getReview: getReview, passThreshold: passThreshold, recordVotes: recordVotes };
