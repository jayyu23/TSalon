import tsalonmemberModel from "../models/tsalonmember.model.js";
import extend from "lodash/extend.js";

const checkExists = (req, res, next) => {
  let walletAddress = req.body.walletAddress;
  if (walletAddress) {
    tsalonmemberModel
      .find({ walletAddress: walletAddress })
      .exec()
      .then(
        (acc) => {
          let results = acc;
          if (results.length == 0) {
            res
              .status(200)
              .json({ walletAddress: walletAddress, registered: false });
          } else {
            res
              .status(200)
              .json({ walletAddress: walletAddress, registered: true });
          }
        },
        (rej) => {
          return res.status(400).json({ error: rej });
        }
      );
  } else {
    return res.status(400).json({ error: "Empty wallet address in request" });
  }
};

export default { checkExists };
