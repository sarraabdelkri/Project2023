const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assessmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: Object,
        contains: {
            answers: { type: Array },
            correctAnswer: String,
            questionName: String
        }
    }],
    category: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Object,
        contains: {
            sentFrom: { type: String },
            message: { type: String }
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },

    scores: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model("assessment", assessmentSchema);
