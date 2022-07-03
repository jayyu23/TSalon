import express from "express";
import tbookdraftController from "../controllers/tbookdraft.controller.js";
import auth from "../controllers/tsalonuser.controller.js";

const router = express.Router();
router
  .route("/api/drafts")
  .post(auth.requireSignin, tbookdraftController.update);
router
  .route("/api/drafts/:tbsn")
  .post(auth.requireSignin, auth.hasAuthorization, tbookdraftController.read)
  .delete(tbookdraftController.deleteDraft);
router
  .route("/api/:username/drafts")
  .post(auth.requireSignin, auth.hasAuthorization, tbookdraftController.list);
router
  .route("/api/submitReview")
  .post(auth.requireSignin, tbookdraftController.submitForReview);

router.param("username", tbookdraftController.getFromUsername);
router.param("tbsn", tbookdraftController.getFromTBSN);

export default router;
