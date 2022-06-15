import express from "express";
import tsalonmemberController from "../controllers/tsalonmember.controller.js";

const router = express.Router();
router.route("/api/checkuser").post(tsalonmemberController.checkExists);

export default router;
