import config from "./../config/config.js";
import app from "./express.js";
import mongoose from "mongoose";

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("success");
  })
  .catch((error) => console.log(error));
