import app from "./express.js";
import config from "../config/config.js";
import mongoose from "mongoose";
import blockchainController from "./controllers/blockchain.controller.js"
import tbookModel from "./models/tbook.model.js"

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Init - Server started on port %s.", config.port);
});

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(async () => {
    console.log("Init - MongoDB Connection Success.");
    // Sync the blockchain
    let pubs = await tbookModel.find({ stage: "publish" }).exec();
    // çblockchainController.updateFromDatabase(pubs);
  })
  .catch((error) => console.log(error));
