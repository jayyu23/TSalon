import express from "express";
import tbookpubController from "../controllers/tbookpub.controller.js";
import blockchainController from "../controllers/blockchain.controller.js"

const router = express.Router();
router
  .route("/api/publications")
  .get(tbookpubController.list)
// .post(tbookpubController.create);

router.route("/api/publication/:tbsn").get(tbookpubController.read);
router.route("/api/price/:tbsn").get(blockchainController.getPrice);
router.route("/api/delete/:tbsn").get(tbookpubController.deletePublication);
router.route("/api/clear").get(tbookpubController.clear);
router.param("tbsn", tbookpubController.getFromTBSN);

export default router;
