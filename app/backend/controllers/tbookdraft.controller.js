import tbookdraftModel from "../models/tbookdraft.model.js";
import extend from "lodash/extend.js";

const update = (req, res, next) => {
  let fields = req.body;

  if (fields.tbsn == 0) {
    // create
    const draft = new tbookdraftModel(fields);
    console.log(draft);
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
    // update
    tbookdraftModel
      .findOneAndUpdate(
        { tbsn: fields.tbsn },
        {
          $set: {
            title: fields.title,
            blurb: fields.blurb,
            content: fields.content,
          },
        }
      )
      .exec()
      .then(
        (acc) => {
          return res
            .status(200)
            .json({ message: "Update success", draft: fields });
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
    return !d.publishDraft;
  });
  let stage2 = drafts.filter((d) => {
    return d.publishDraft;
  });
  return res
    .status(200)
    .json({ status: "success", stage1: stage1, stage2: stage2 });
};

const getFromTBSN = (req, res, next, tbsn) => {
  console.log(tbsn);
  tbookdraftModel
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
  tbookdraftModel
    .find({
      author: { $regex: usernameFiltered, $options: "i" },
    })
    .sort({ tbsn: -1 })
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

const deleteDraft = (req, res) => {
  let draft = req.draft;
  if (draft) {
    tbookdraftModel.deleteOne({ tbsn: draft.tbsn }).then(
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

export default {
  update,
  list,
  read,
  getFromUsername,
  getFromTBSN,
  deleteDraft,
};
