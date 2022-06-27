import express from "express";
import tbookdraftController from "../controllers/tbookdraft.controller.js";

const router = express.Router();
router.route("/api/drafts").post(tbookdraftController.update);
router.route("/api/drafts/:tbsn").get(tbookdraftController.read);
router.route("/api/:username/drafts").get(tbookdraftController.list);
router.param("username", tbookdraftController.getFromUsername);
router.param("tbsn", tbookdraftController.getFromTBSN);

export default router;
