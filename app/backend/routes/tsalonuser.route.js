import express from "express";
import tsalonuserController from "../controllers/tsalonuser.controller.js";

const router = express.Router();
router.route("/api/checkWallet").post(tsalonuserController.checkWalletExists);
router.route("/api/createUser").post(tsalonuserController.createUser);

export default router;
