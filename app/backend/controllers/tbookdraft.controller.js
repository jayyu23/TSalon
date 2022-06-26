import tbookdraftModel from "../models/tbookdraft.model.js";
import extend from "lodash/extend.js";

const create = (req, res, next) => {
  let fields = req.body;
  fields.tbsn = 0; // dummy
  console.log(req.body);
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

export default { create, list, getFromUsername };
