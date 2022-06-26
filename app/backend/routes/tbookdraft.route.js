import express from "express";
import tbookdraftController from "../controllers/tbookdraft.controller.js";

const router = express.Router();
router.route("/api/drafts").post(tbookdraftController.create);
router.route("/api/drafts/:username").get(tbookdraftController.list);
router.param("username", tbookdraftController.getFromUsername);

export default router;
