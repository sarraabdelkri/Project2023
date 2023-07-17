const assessmentController = require('../controller/assessmentController');
const Assessment = require('../model/assessment');
const User = require('../model/userModel');
describe('createAssessment function', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                assessment: {
                    name: 'Test Assessment',
                    category: 'Test Category',
                    questions: [
                        {
                            question: 'Test Question 1',
                            answers: ['Answer 1', 'Answer 2', 'Answer 3'],
                        },
                        {
                            question: 'Test Question 2',
                            answers: ['Answer 1', 'Answer 2', 'Answer 3'],
                        },
                    ],
                },
                createdBy: 'user123',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should create a new assessment', async () => {
        Assessment.prototype.save = jest.fn().mockResolvedValue({
            _id: 'assessment123',
            name: 'Test Assessment',
            category: 'Test Category',
            questions: [
                {
                    question: 'Test Question 1',
                    answers: [
                        {
                            name: 'Answer 1',
                            selected: false,
                        },
                        {
                            name: 'Answer 2',
                            selected: false,
                        },
                        {
                            name: 'Answer 3',
                            selected: false,
                        },
                    ],
                },
                {
                    question: 'Test Question 2',
                    answers: [
                        {
                            name: 'Answer 1',
                            selected: false,
                        },
                        {
                            name: 'Answer 2',
                            selected: false,
                        },
                        {
                            name: 'Answer 3',
                            selected: false,
                        },
                    ],
                },
            ],
            createdBy: 'user123',
        });

        await assessmentController.createAssessment(req, res, next);

        expect(Assessment.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.prototype.save = jest.fn().mockRejectedValue(new Error('Test Error'));

        await assessmentController.createAssessment(req, res, next);

        expect(Assessment.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});
describe('getAllAssessment function', () => {
    it('should return all assessments', async () => {
        const mockAssessments = [{ name: 'Assessment 1' }, { name: 'Assessment 2' }];
        Assessment.find = jest.fn().mockResolvedValue(mockAssessments);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAllAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ assessments: mockAssessments });
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.find = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAllAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});
describe('getAssessment function', () => {
    it('should return the assessment with the given id', async () => {
        const mockAssessment = { name: 'Assessment 1' };
        Assessment.findOne = jest.fn().mockResolvedValue(mockAssessment);
        const req = { params: { id: 'assessment123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ assessment: mockAssessment });
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.findOne = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = { params: { id: 'assessment123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
    it('should return 404 if assessment is not found', async () => {
        Assessment.findOne = jest.fn().mockResolvedValue(null);
        const req = { params: { id: 'assessment123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Assessment not found' });
    });

});
describe('addComment function', () => {
    it('should add a comment to the assessment', async () => {
        const mockAssessment = { _id: 'assessment123', comments: [] };
        Assessment.updateOne = jest.fn().mockResolvedValue(mockAssessment);
        const req = {
            body: {
                assessmentId: 'assessment123',
                sentFrom: 'user123',
                message: 'test message'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
        expect(Assessment.updateOne).toHaveBeenCalledWith(
            { _id: 'assessment123' },
            {
                $push: {
                    comments: {
                        sentFrom: 'user123',
                        message: 'test message'
                    }
                }
            }
        );
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.updateOne = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            body: {
                assessmentId: 'assessment123',
                sentFrom: 'user123',
                message: 'test message'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await assessmentController.addComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(new Error('Test Error'));
    });
});

describe('deleteComment function', () => {
    it('should delete a comment from the assessment', async () => {
        const mockAssessment = { _id: 'assessment123', comments: [{ sentFrom: 'user123', message: 'test message' }] };
        Assessment.updateOne = jest.fn().mockResolvedValue(mockAssessment);
        const req = {
            body: {
                assessmentId: 'assessment123',
                sentFrom: 'user123',
                message: 'test message'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.deleteComment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
        expect(Assessment.updateOne).toHaveBeenCalledWith(
            { _id: 'assessment123' },
            {
                $pull: {
                    comments: {
                        sentFrom: 'user123',
                        message: 'test message'
                    }
                }
            }
        );
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.updateOne = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            body: {
                assessmentId: 'assessment123',
                sentFrom: 'user123',
                message: 'test message'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await assessmentController.deleteComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(new Error('Test Error'));
    });
});

describe('getAssessmentsByCourseName function', () => {
    it('should return a list of assessments for the given course name', async () => {
        const courseName = 'C++';
        const assessments = [{ courseName, name: 'Test Assessment 1' }, { courseName, name: 'Test Assessment 2' },];
        jest.spyOn(Assessment, 'find').mockResolvedValue(assessments);
        const req = { params: { courseName } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAssessmentsByCourseName(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, assessments });
    });

    it('should return a server error response if an error occurs', async () => {
        const courseName = 'C++';
        jest.spyOn(Assessment, 'find').mockRejectedValue(new Error('Test Error'));
        const req = { params: { courseName } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getAssessmentsByCourseName(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});



describe('updateAssessment function', () => {
    it('should update an assessment and return the updated assessment', async () => {
        const mockUpdatedAssessment = { name: 'Updated Assessment', category: 'Updated Category', questions: [1, 2, 3] };
        Assessment.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedAssessment);
        const req = {
            params: { id: '123' },
            body: { name: 'Updated Assessment', category: 'Updated Category', questions: [1, 2, 3] }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.updateAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Assessment updated successfully",
            data: mockUpdatedAssessment
        });
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            params: { id: '123' },
            body: { name: 'Updated Assessment', category: 'Updated Category', questions: [1, 2, 3] }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.updateAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});







describe('getMyAssessment function', () => {
    it('should return assessments created by the user with the specified ID', async () => {
        const mockAssessments = [{ _id: 'assessment_id_1', createdBy: 'user_id' }, { _id: 'assessment_id_2', createdBy: 'user_id' },];
        Assessment.find = jest.fn().mockResolvedValue(mockAssessments);
        const req = {
            params: {
                id: 'user_id',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getMyAssessment(req, res);
        expect(Assessment.find).toHaveBeenCalledWith({ createdBy: req.params.id });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ assessment: mockAssessments });
    });
    it('should return error 500 if there is an error finding assessments', async () => {
        const error = new Error('An error occurred');
        Assessment.find = jest.fn().mockRejectedValue(error);
        const req = {
            params: {
                id: 'user_id',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.getMyAssessment(req, res);
        expect(Assessment.find).toHaveBeenCalledWith({ createdBy: req.params.id });
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
describe('LikeAssessment function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add the assessment to the user\'s liked assessments and increment likes when the user hasn\'t liked the assessment yet', async () => {
        const user = { _id: 'user123', likedAssessments: [] };
        const assessment = { _id: 'assessment123', likes: 0 };

        User.findOne = jest.fn().mockResolvedValue(null);
        User.updateOne = jest.fn();
        Assessment.updateOne = jest.fn();
        const req = {
            body: {
                userId: user._id,
                assessmentId: assessment._id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await assessmentController.LikeAssessment(req, res);

        expect(User.updateOne).toHaveBeenCalledWith(
            { _id: user._id },
            {
                $push: { likedAssessments: assessment._id }
            }
        );
        expect(Assessment.updateOne).toHaveBeenCalledWith(
            { _id: assessment._id },
            {
                $inc: { likes: 1 }
            }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'added to liked' });
    });

    it('should remove the assessment from the user\'s liked assessments and decrement likes when the user has already liked the assessment', async () => {
        const user = { _id: 'user123', likedAssessments: ['assessment123'] };
        const assessment = { _id: 'assessment123', likes: 1 };

        User.findOne = jest.fn().mockResolvedValue(user);
        User.updateOne = jest.fn();
        Assessment.updateOne = jest.fn();
        const req = {
            body: {
                userId: user._id,
                assessmentId: assessment._id
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await assessmentController.LikeAssessment(req, res);

        expect(User.updateOne).toHaveBeenCalledWith(
            { _id: user._id },
            {
                $pull: { likedAssessments: assessment._id }
            }
        );
        expect(Assessment.updateOne).toHaveBeenCalledWith(
            { _id: assessment._id },
            {
                $inc: { likes: -1 }
            }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'removed from liked' });
    });

    it('should return a 500 status code and an error message if an error occurs', async () => {
        User.findOne = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            body: {
                userId: 'user123',
                assessmentId: 'assessment123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await assessmentController.LikeAssessment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred', error: new Error('Test Error') });
    });
});

describe('deleteAssessment function', () => {
    it('should delete an assessment by id', async () => {
        const mockAssessment = { _id: 'assessment123' };
        Assessment.findByIdAndDelete = jest.fn().mockResolvedValue(mockAssessment);
        const req = {
            params: { id: 'assessment123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.deleteAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Assessment deleted successfully' });
        expect(Assessment.findByIdAndDelete).toHaveBeenCalledWith('assessment123');
    });

    it('should return 500 if an error occurs', async () => {
        Assessment.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            params: { id: 'assessment123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await assessmentController.deleteAssessment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});