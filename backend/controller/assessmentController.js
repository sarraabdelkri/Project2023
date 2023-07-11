const assessment = require('../model/assessment');
const Assessment = require('../model/assessment');
const User = require("../model/userModel");

// Create Assessment
const createAssessment = async (req, res) => {
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
    assessment.save().then((result) => {
        res.status(200).json({ success: true });
    });
};

// AssessmentBy idUser /my-assessment/:id
const getMyAssessment = async (req, res) => {
    Assessment.find({ createdBy: req.params.id })
        .then(assessment => {
            res.status(200).json({ assessment });
        })
};

// All Assessment /all-assessment
const getAllAssessment = async (req, res) => {
    Assessment.find()
        .then(assessments => {
            res.status(200).json({ assessments });
        })
};

// Assessment by id /assessment/:id
const getAssessment = async (req, res) => {
    Assessment.findOne({ _id: req.params.id }).then(assessment => {
        res.status(200).json({ assessment });
    })
};

// updateOne add comment
const addComment = async (req, res) => {
    Assessment.updateOne({ _id: req.body.assessmentId }, {
        $push: {
            comments: {
                sentFrom: req.body.sentFrom,
                message: req.body.message
            }
        }
    }).then(assessment => {
        res.status(200).json({ success: true });
    }).catch(er => {
        res.status(500).send(er);
    })
};


const deleteComment = async (req, res) => {
    const { assessmentId, commentId } = req.body;

    Assessment.updateOne({ _id: assessmentId }, {
        $pull: {
            comments: {
                _id: commentId
            }
        }
    })
        .then(assessment => {
            if (assessment.nModified === 0) {
                return res.status(404).json({ message: 'Comment not found.' });
            }
            res.status(200).json({ success: true });
        })
        .catch(error => {
            res.status(500).send(error);
        })
};

// Like Assessment
const LikeAssessment = async (req, res) => {
    User.findOne({ _id: req.body.userId, likedAssessments: { $in: [req.body.assessmentId] } }).then(async user => {
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
    })
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
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete assessment by id
const deleteAssessment = async (req, res) => {
    try {
        const { id } = req.params;
        await Assessment.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Assessment deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



module.exports = {
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