const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersessionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  });
  
module.exports = mongoose.model('userSession', usersessionSchema);
  