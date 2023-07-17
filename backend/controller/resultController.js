const Result = require('../model/result')
const Assessment = require('../model/assessment');

const saveResult = async (req, res) => {
    let result = new Result({
        userId: req.body.currentUser,
        answers: req.body.answers,
        assessmentId: req.body.assessmentId
    });
    result.save().then(async resp => {
        await Assessment.updateOne({ _id: req.body.assessmentId }, {
            $push: {
                scores: resp._id
            }
        });
        res.status(200).json({ resultId: resp._id });
    })
};

// Result by id /assessment/:id
const getResult = async (req, res) => {
    Result.findOne({ _id: req.params.id }).then(result => {
        res.status(200).json({ result });
    })
};

const getAllResults = async (req, res) => {
    try {
        const results = await Result.find({ deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.log(err);
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
            return res.status(404).json({ success: false, message: 'Result not found' });
        }
        res.json({ success: true, message: 'Result updated successfully', data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
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
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getResultsByUserId = async (req, res) => {
    try {
        const results = await Result.find({ userId: req.params.userId, deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};
const getResultsByAssementId = async (req, res) => {
    try {
        const results = await Result.find({ courseId: req.params.assessmentId, deleted: false }).sort({ createdAt: -1 });
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};
const getResultsAndAssessmentsByUserId = async (req, res) => {
    try {
        const results = await Result.find({ userId: req.params.userId, deleted: false }).sort({ createdAt: -1 });

        if (results.length === 0) {
            res.status(500).send("No results found");
        } else {
            const data = [];
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                const assessment = await Assessment.findOne({ _id: result.assessmentId });
                if (!assessment) {
                    res.status(500).send("Error getting assessment");
                    return;
                }
                data.push({ result: result, assessment: assessment });
            }
            res.status(200).json({ data: data });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getResults = async (req, res) => {
    if (!req.params.id) {
        res.status(500).send("No id provided in params");
    } else {
        Result.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(500).send("Error finding score");
            } else {
                Assessment.findOne({ _id: data.assessmentId }).then(assessment => {
                    if (!assessment) {
                        res.status(500).send("Error getting assessment");
                    } else {
                        res.status(200).json({ score: data, assessment: assessment });
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Error finding score");
        })
    }
}


module.exports = {
    saveResult,
    getAllResults,
    getResultsByUserId,
    getResultsByAssementId,
    getResultsAndAssessmentsByUserId,
    getResult,
    updateResultById,
    deleteResultById,
    getResults
};