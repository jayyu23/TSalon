import tbookpubModel from "../models/tbookpub.model.js";
import tbookdraftModel from "../models/tbookdraft.model.js";
import extend from "lodash/extend.js";
import blockchainController from "../controllers/blockchain.controller.js"

const create = (req, res, next) => {
  let fields = req.body;
  const publication = new tbookpubModel(fields);
  publication.save().then(
    (acc) => {
      blockchainController.publish(fields.tbsn);
      return res
        .status(200)
        .json({ message: "Publication success", publication: acc });
    },
    (rej) => {
      return res.status(400).json({ error: rej });
    }
  );
};

const list = (req, res, next) => {
  tbookpubModel
    .find()
    .sort({ tbsn: -1 })
    .exec()
    .then(
      (acc) => {
        let publications = acc;
        return res.json(publications);
      },
      (rej) => {
        return res.status(400).json({ error: err });
      }
    );
};

const getFromTBSN = (req, res, next, tbsn) => {
  tbookpubModel
    .findOne({ tbsn: tbsn })
    .exec()
    .then(
      (acc) => {
        let publication = acc;
        req.publication = publication;
        next();
      },
      (rej) => {
        return res.status(400).json({ error: rej.message });
      }
    );
};

const read = (req, res) => {
  let publication = req.publication;
  if (publication) {
    return res.status(200).json(publication);
  } else {
    return res.status(400).json({ error: "Invalid TBSN" });
  }
};

const deletePublication = (req, res) => {
  let publication = req.publication;
  tbookpubModel.findOneAndDelete({ tbsn: publication.tbsn }).then(
    (acc) => {
      if (acc) {
        return res.status(200).json({ message: "delete success", acc: acc });
      } else {
        return res.status(400).json({ error: "error in delete" });
      }
    },
    (rej) => {
      return res.status(400).json({ error: rej.message });
    }
  );
};

const clear = (req, res) => {
  tbookpubModel
    .find()
    .select()
    .deleteMany()
    .exec()
    .then((acc, rej) => {
      if (acc) {
        return res.status(200).json({ message: "delete success", acc: acc });
      } else {
        return res.status(400).json({ error: "error in delete" });
      }
    });
};

export default { create, list, getFromTBSN, read, deletePublication, clear };
