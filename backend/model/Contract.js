const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contractSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
     required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  renewedAt: {
    type: Date
  },
  terminatedAt: {
    type: Date
  },
  type: {
    type: String,
    required: true,
  },
  contractstatus: {
    type: String,
    default: "Active",
    required: true,
    
  
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
     required: true,
  },
  job : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    
  },
 
});


module.exports = mongoose.model("Contract", contractSchema);


    


