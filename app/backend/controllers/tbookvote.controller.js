import tbookdraftModel from "../models/tbookdraft.model.js";
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
        res.status(400).json({ success: 400 });
      }
    );
};

export default { getReview: getReview };
