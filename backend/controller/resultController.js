const Result = require('../model/result')
const Assessment = require('../model/assessment');

const saveResult = async (req, res) => {
    let result = new Result({
        userId: req.body.currentUser,
        answers: req.body.answers,
        assessmentId: req.body.assessmentId,
        courseId: req.body.courseId
    });
    result.save().then(async resp => {
        await Assessment.updateOne({ _id: req.body.assessmentId }, {
            $push: {
                results: resp._id
            }
        });
        res.status(200).json({ resultId: resp._id })

    });
};

const getAllResults = async (req, res) => {
    try {
        const results = await Result.find({ deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// UPDATE
const updateResultById = async (req, res) => {
    try {
        const result = await Result.findByIdAndUpdate(req.params.id, {
            assessmentId: req.body.assessmentId,
            answers: req.body.answers,
            userId: req.body.userId,
            courseId: req.body.courseId
        }, { new: true });
        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


// DELETE
const deleteResultById = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getResultsByUserId = async (req, res) => {
    try {
        const results = await Result.find({ userId: req.params.userId, deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
const getResultsByAssementId = async (req, res) => {
    try {
        const results = await Result.find({ courseId: req.params.assessmentId, deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    saveResult,
    getAllResults,
    getResultsByUserId,
    getResultsByAssementId,
    updateResultById,
    deleteResultById
};
