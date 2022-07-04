import express from "express";
import tbookvoteController from "../controllers/tbookvote.controller.js";
import auth from "../controllers/tsalonuser.controller.js";

const router = express.Router();

router
  .route("/api/getReview")
  .post(
    auth.requireSignin,
    auth.hasAuthorization,
    tbookvoteController.getReview
  );

export default router;
