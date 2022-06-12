import tbookpubModel from "../models/tbookpub.model.js";
import extend from "lodash/extend.js";

const create = (req, res, next) => {
  console.log("hi");
  const publication = new tbookpubModel(req.body);
  console.log(publication);
  try {
    publication.save();
    return res.status(200).json({ message: "Publication success" });
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
        console.log(publications);
        return res.json(publications);
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};
const getFromTBSN = (req, res, next, tbsn) => {
  try {
    let publication = tbookpubModel.find({ tbsn: tbsn });
    console.log(publication);
    if (!publication) {
      return res.status(400).json({ error: "User not found" });
    }
    req.publication = publication;
    next();
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export default { create, list, getFromTBSN };
