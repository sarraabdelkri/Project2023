const Assessment = require('../model/assessment');
const User = require("../model/userModel");

// Create Assessment
const createAssessment = async (req, res) => {
    try {
        let assessment = new Assessment({
            ...req.body.assessment,
            createdBy: req.body.createdBy,
            questions: req.body.assessment.questions
                ? req.body.assessment.questions.map((ques) => {
                    return {
                        ...ques,
                        answers: ques.answers.map((ans) => {
                            return {
                                name: ans,
                                selected: false,
                            };
                        }),
                    };
                })
                : [],
        });
        const result = await assessment.save();
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// AssessmentBy idUser /my-assessment/:id
const getMyAssessment = async (req, res) => {
    try {
        const assessments = await Assessment.find({ createdBy: req.params.id });
        res.status(200).json({ assessment: assessments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


const getAllAssessment = async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.status(200).json({ assessments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Assessment by id /assessment/:id
const getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findOne({ _id: req.params.id });
        if (!assessment) {
            return res.status(404).json({ success: false, message: 'Assessment not found' });
        }
        res.status(200).json({ assessment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// updateOne add comment
const addComment = async (req, res) => {
    try {
        await Assessment.updateOne(
            { _id: req.body.assessmentId },
            {
                $push: {
                    comments: {
                        sentFrom: req.body.sentFrom,
                        message: req.body.message,
                    },
                },
            }
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
};



const deleteComment = async (req, res) => {
    try {
        const { assessmentId, sentFrom, message } = req.body;
        await Assessment.updateOne(
            { _id: assessmentId },
            { $pull: { comments: { sentFrom, message } } }
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
};

const LikeAssessment = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId, likedAssessments: { $in: [req.body.assessmentId] } });
        if (!user) {
            await User.updateOne({ _id: req.body.userId }, {
                $push: {
                    likedAssessments: req.body.assessmentId
                }
            });
            await Assessment.updateOne({ _id: req.body.assessmentId }, {
                $inc: {
                    likes: 1
                }
            });
            res.status(200).json({ message: 'added to liked' });
        } else {
            await User.updateOne({ _id: req.body.userId }, {
                $pull: {
                    likedAssessments: req.body.assessmentId
                }
            });
            await Assessment.updateOne({ _id: req.body.assessmentId }, {
                $inc: {
                    likes: -1
                }
            });
            res.status(200).json({ message: 'removed from liked' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};



// Update an assessment by ID
const updateAssessment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, questions } = req.body;

        const updatedAssessment = await Assessment.findByIdAndUpdate(
            id,
            { name, category, questions },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Assessment updated successfully",
            data: updatedAssessment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete assessment by id
const deleteAssessment = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        console.log(id)
        await Assessment.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Assessment deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getAssessmentsByCourseName = async (req, res, next) => {
    const { courseName } = req.params;
    try {
        const assessments = await Assessment.find({ courseName });
        res.status(200).json({ success: true, assessments });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAssessmentsByCourseName,
    LikeAssessment,
    addComment,
    getAssessment,
    getAllAssessment,
    getMyAssessment,
    createAssessment,
    updateAssessment,
    deleteAssessment,
    deleteComment
};