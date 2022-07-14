import express from "express";
import tsalonuserController from "../controllers/tsalonuser.controller.js";

const router = express.Router();

router.route("/api/signin").post(tsalonuserController.signin);
router
  .route("/api/auth")
  .post(
    tsalonuserController.requireSignin,
    tsalonuserController.hasAuthorization,
    tsalonuserController.passedAuthentication
  );
router.route("/api/createUser").post(tsalonuserController.createUser);
router.route("/api/collection/:username").get(tsalonuserController.getCollection)

router.param("username", tsalonuserController.getAddressFromUsername);



export default router;
