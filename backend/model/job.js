const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    workplaceType: {
        type: String,
        required: true,
        enum: ["on-site", "hybrid", "remote"],
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ["full-time", "part-time", "internship"],
    },
    requiredSkills: {
        type: String,
        required: true
    },
    aboutJob: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    applied: {
        type: Number,
        default: 0,
    },
    contracts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Contract"
        }
      ]

});

module.exports = mongoose.model("job", jobSchema);