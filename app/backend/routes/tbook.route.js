import express from "express";
import tbookController from "../controllers/tbook.controller.js";
import auth from "../controllers/tsalonuser.controller.js";
import blockchainController from "../controllers/blockchain.controller.js"

const router = express.Router();
router
  .route("/api/drafts")
  .post(auth.requireSignin, tbookController.update);
router
  .route("/api/drafts/:tbsn")
  .post(auth.requireSignin, auth.hasAuthorization, tbookController.read)
  .delete(tbookController.deleteDraft);
router
  .route("/api/:username/drafts")
  .post(auth.requireSignin, auth.hasAuthorization, tbookController.list);
router
  .route("/api/submitReview")
  .post(auth.requireSignin, tbookController.submitForReview);

router.route("/api/publications").get(tbookController.publicList)
router.route("/api/publication/:tbsn").get(tbookController.publicRead);
router.route("/api/price/:tbsn").get(blockchainController.getPrice);


router.param("username", tbookController.getFromUsername);
router.param("tbsn", tbookController.getFromTBSN);

export default router;
