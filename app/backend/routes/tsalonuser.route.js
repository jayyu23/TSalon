import express from "express";
import tsalonmessageController from "../controllers/tsalonmessage.controller.js";
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
router.route("/api/messages/:username").post(tsalonuserController.requireSignin, tsalonuserController.hasAuthorization,
  tsalonmessageController.getMessages)


router.param("username", tsalonuserController.getAddressFromUsername);



export default router;
