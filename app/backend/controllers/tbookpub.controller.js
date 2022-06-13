import tbookpubModel from "../models/tbookpub.model.js";
import extend from "lodash/extend.js";

const create = (req, res, next) => {
  let fields = req.body;
  fields.tbsn = 0; // dummy
  // get tbsn
  const publication = new tbookpubModel(fields);
  try {
    publication.save();
    return res
      .status(200)
      .json({ message: "Publication success", publication: publication });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const list = (req, res, next) => {
  try {
    tbookpubModel
      .find()
      .select()
      .exec()
      .then((acc, rej) => {
        let publications = acc;
        return res.json(publications);
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};
const getFromTBSN = (req, res, next, tbsn) => {
  try {
    tbookpubModel
      .findOne({ tbsn: tbsn })
      .exec()
      .then((acc, rej) => {
        let publication = acc;
        console.log(publication);
        req.publication = publication;
        next();
      });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const read = (req, res) => {
  try {
    let publication = req.publication;
    return res.status(200).json(publication);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deletePublication = (req, res) => {
  try {
    let publication = req.publication;
    tbookpubModel
      .findOneAndDelete({ tbsn: publication.tbsn })
      .then((acc, rej) => {
        if (acc) {
          return res.status(200).json({ message: "delete success", acc: acc });
        } else {
          return res.status(400).json({ error: "error in delete" });
        }
      });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export default { create, list, getFromTBSN, read, deletePublication };
