import tsalonuserModel from "../models/tsalonuser.model.js";
import extend from "lodash/extend.js";

const checkWalletExists = (req, res, next) => {
  let walletAddress = req.body.walletAddress;
  if (walletAddress) {
    tsalonuserModel
      .find({ walletAddress: walletAddress })
      .exec()
      .then(
        (acc) => {
          let results = acc;
          if (results.length == 0) {
            return res
              .status(200)
              .json({ walletAddress: walletAddress, registered: false });
          } else {
            return res
              .status(200)
              .json({
                walletAddress: walletAddress,
                registered: true,
                user: results[0],
              });
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

const createUser = (req, res, next) => {
  let username = req.body.username;
  let walletAddress = req.body.walletAddress;
  if (username) {
    tsalonuserModel
      .find({ username: { $regex: username, $options: "i" } })
      .exec()
      .then(
        (acc) => {
          let results = acc;
          if (results.length == 0) {
            // Create the new user
            tsalonuserModel
              .create({
                username: username,
                walletAddress: walletAddress,
              })
              .then(
                (acc) => {
                  return res.status(200).json({
                    username: username,
                    walletAddress: walletAddress,
                    success: true,
                  });
                },
                (rej) => {
                  return res.status(400).json({ error: rej });
                }
              );
          } else {
            // Username already exists
            return res.status(200).json({ username: username, success: false });
          }
        },
        (rej) => {
          return res.status(400).json({ error: rej });
        }
      );
  } else {
    return res.status(400).json({ error: "Empty username in the request" });
  }
};

export default {
  checkWalletExists: checkWalletExists,
  createUser: createUser,
};
