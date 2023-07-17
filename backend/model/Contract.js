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
    default: "CDD"

  },
  contractstatus: {
    type: String,
    required: true,
    
  
    
  },
  salary: {
    type: Number,
    //required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
     required: true,
  },
  job : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    
  },
  atelier : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "atelier",
  },


 
});


module.exports = mongoose.model("Contract", contractSchema);


    


