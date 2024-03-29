import tbookModel from "../models/tbook.model.js";
import extend from "lodash/extend.js";
import tsalonmessageController from "./tsalonmessage.controller.js";
import tsalonuserModel from "../models/tsalonuser.model.js";
import blockchainController from "./blockchain.controller.js"

const update = (req, res, next) => {
  let fields = req.body;

  if (fields.tbsn == 0) {
    // Create
    const draft = new tbookModel(fields);
    draft.save().then(
      (acc) => {
        return res.status(200).json({ message: "Draft success", draft: acc });
      },
      (rej) => {
        console.log(rej);
        return res.status(400).json({ error: rej.message });
      }
    );
  } else {
    // Save and Update
    tbookModel
      .findOneAndUpdate(
        { tbsn: fields.tbsn },
        {
          $set: {
            title: fields.title,
            blurb: fields.blurb,
            content: fields.content,
            lastSaveDate: new Date(),
            coverImage: fields.coverImage,
            pubMode: fields.pubMode,
          },
        }
      )
      .exec()
      .then(
        (acc) => {
          return res
            .status(200)
            .json({ message: "Update success", draft: acc });
        },
        (rej) => {
          return res.status(400).json({ error: rej.mesage });
        }
      );
  }
};

const list = (req, res, next) => {
  let drafts = req.drafts;
  let stage1 = drafts.filter((d) => {
    return d.stage == "draft";
  });
  let stage2 = drafts.filter((d) => {
    return d.stage == "review";
  });
  return res
    .status(200)
    .json({ status: "success", stage1: stage1, stage2: stage2 });
};

const publicList = (req, res, next) => {
  tbookModel
    .find({ stage: "publish" })
    .sort({ tbsn: -1 })
    .exec()
    .then(
      (acc) => {
        let publications = acc;
        return res.status(200).json(publications);
      },
      (rej) => {
        return res.status(400).json({ error: err });
      }
    );
}

const getFromTBSN = (req, res, next, tbsn) => {
  tbookModel
    .findOne({ tbsn: tbsn })
    .exec()
    .then(
      (acc) => {
        req.draft = acc;
        next();
      },
      (rej) => {
        return res.status(400).json({ error: rej.message });
      }
    );
};

const getFromUsername = (req, res, next, username) => {
  let usernameFiltered = username.replace(/_/g, " ");
  tbookModel
    .find({
      author: { $regex: usernameFiltered, $options: "i" },
    })
    .sort({ lastSaveDate: -1 })
    .exec()
    .then(
      (acc) => {
        let drafts = acc;
        req.drafts = drafts;
        next();
      },
      (rej) => {
        return res.status(400).json({ error: rej.message });
      }
    );
};

const read = (req, res) => {
  let publication = req.draft;
  if (publication) {
    return res.status(200).json(publication);
  } else {
    return res.status(400).json({ error: "Invalid TBSN" });
  }
};

const publicRead = (req, res) => {
  let publication = req.draft;
  if (publication && publication.stage == "publish") {
    return res.status(200).json(publication);
  } else {
    return res.status(400).json({ error: "Invalid TBSN" });
  }
}

const deleteDraft = (req, res) => {
  let draft = req.draft;
  if (draft) {
    tbookModel.deleteOne({ tbsn: draft.tbsn }).then(
      (acc) => {
        return res.status(200).json({ status: "success", data: acc });
      },
      (rej) => {
        return res.status(400).json({ status: "reject", message: rej });
      }
    );
  } else {
    return res
      .status(404)
      .json({ status: "reject", message: "No draft found" });
  }
};

const submitForReview = (req, res) => {
  let fields = req.body;
  let tbsn = fields.tbsn;
  let pubMode = fields.pubMode;

  console.log(fields)

  if (!tbsn) {
    res.status(400), json({ success: false, message: "No TBSN found" });
  }
  if (pubMode == "green") {
    tbookModel.findOneAndUpdate({ tbsn: tbsn }, { $set: { stage: "publish", reviewDate: new Date() } }).then((acc) => {
      tsalonuserModel.findOneAndUpdate({ username: acc.author }, { $inc: { greenTokens: -1 } }).exec();
      // Publish onto the Blockchain
      blockchainController.publish(tbsn);
      tsalonmessageController.logMessage(acc.author, "TSalon", `Draft #${acc.tbsn} – \"${acc.title}\" Self-Published`,
        `Congratulations! Your writing \"${acc.title}\" has been self-published as TBook #${tbsn}. 
          As the author, you will receive a free mint of the NFT. Users can view this TBook publicly at tsalon.io/view/${tbsn}`, new Date());
      res.status(200).json({ success: true })
    }, (rej) => {
      res.status(400), json({ success: false, message: rej });
    })
  } else {
    // Then set the stage for review
    tbookModel
      .findOneAndUpdate(
        { tbsn: tbsn },
        {
          $set: {
            stage: "review",
            reviewDate: new Date(),
          },
        }
      )
      .then(
        (acc) => {
          tsalonmessageController.logMessage(acc.author, "TSalon", `Draft #${acc.tbsn} – \"${acc.title}\" Submitted for Review`,
            tsalonmessageController.reviewMessage, new Date());
          res.status(200).json({ success: true })
        },
        (rej) => {
          res.status(400), json({ success: false, message: rej });
        }
      );
  }
};

export default {
  update,
  list,
  read,
  getFromUsername,
  getFromTBSN,
  deleteDraft,
  submitForReview,
  publicList,
  publicRead
};
