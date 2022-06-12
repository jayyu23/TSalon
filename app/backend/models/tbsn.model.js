import mongoose from "mongoose";

const offset = 75000;

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

counterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model("counter", counterSchema);

const autoIncrementTBSN = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    // ** Method call begins **
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    function (error, counter) {
      // The callback
      if (error) return next(error);
      doc.tbsn = counter.seq + offset;
      next();
    }
  ); // ** Method call ends **
};

export default autoIncrementTBSN;
