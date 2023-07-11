const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    assessmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Boolean,
        default: false
    }


});
module.exports = mongoose.model("result", ResultSchema);