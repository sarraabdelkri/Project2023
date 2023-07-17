
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      rating: {
        type: Number,
        required: true,
      },
    },
);

module.exports = mongoose.model("review", reviewSchema);