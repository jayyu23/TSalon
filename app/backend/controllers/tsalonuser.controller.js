import tsalonuserModel from "../models/tsalonuser.model.js";
import extend from "lodash/extend.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";
import blockchainController from "./blockchain.controller.js";
import tbookpubController from "./tbookpub.controller.js";
import tbookpubModel from "../models/tbookpub.model.js";

const signin = (req, res, next) => {
  let walletAddress = req.body.walletAddress.toLowerCase();
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
            // Sign in the user with a JSON Web Token
            const token = jwt.sign(
              { address: walletAddress },
              config.jwtSecret
            );
            res.cookie("t", token, { expire: new Date() + 9999 });

            return res.status(200).json({
              token,
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
                  const token = jwt.sign(
                    { address: walletAddress },
                    config.jwtSecret
                  );
                  res.cookie("t", token, { expire: new Date() + 9999 });

                  return res.status(200).json({
                    token,
                    walletAddress: walletAddress,
                    success: true,
                    user: username,
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

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.body.walletAddress &&
    req.auth &&
    req.body.walletAddress.toLowerCase() == req.auth.address.toLowerCase();
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const passedAuthentication = (req, res, next) => {
  return res.status(200).json({ success: true });
};

const signout = (req, res, next) => { };

const getCollection = (req, res, next) => {
  let walletAddress = req.walletAddress;
  blockchainController.getUserCollection(walletAddress).then((acc) => {
    const chainData = acc;
    let tbooks = []
    chainData.forEach((t) => { tbooks.push(t.tbsn) });
    tbookpubModel.find({ tbsn: { $in: tbooks } }).sort({ tbsn: -1 }).exec().then((acc) => {
      return res.status(200).json({ success: true, tbooks: acc, chainData: chainData, username: req.username });
    }, (rej) => {
      console.log(rej);
      return res.status(400).json({ success: false, error: rej });
    });

  }, (rej) => {
    console.log(rej);
    return res.status(400), json({ success: false, error: rej });
  });

}

const getAddressFromUsername = (req, res, next, username) => {
  let usernameFiltered = username.replace(/_/g, " ");
  tsalonuserModel.findOne({ username: { $regex: usernameFiltered, $options: "i" } }).exec().then((acc) => {
    let walletAddress = acc.walletAddress;
    req.walletAddress = walletAddress;
    req.username = acc.username;
    next();
  }, (rej) => {
    res.status(400).json({ success: false, error: rej });
  })
}

export default {
  createUser: createUser,
  signin: signin,
  requireSignin: requireSignin,
  hasAuthorization: hasAuthorization,
  passedAuthentication: passedAuthentication,
  getAddressFromUsername: getAddressFromUsername,
  getCollection: getCollection
};
