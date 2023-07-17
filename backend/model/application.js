const mongoose = require('mongoose');
const job = require('./job');

const applicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    coverLetter: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: [
            "applied",
            "shortlisted", // when a applicant is shortlisted
            "accepted", // when a applicant is accepted
            "rejected", // when a applicant is rejected
            "deleted", // when any job is deleted
            "cancelled", // an application is cancelled by its author or when other application is accepted
            "finished",
        ],
        default: 'applied'
    },
    appliedOn: {
        type: Date,
        default: Date.now
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
