const resultController = require('../controller/resultController');
const Result = require('../model/result');
describe('getResult function', () => {
    it('should return the result', async () => {
        const req = {
            params: {
                id: 'result123'
            }
        };
        const resp = {
            userId: 'user123',
            answers: [{ questionId: 'q1', answer: 'a1' }, { questionId: 'q2', answer: 'a2' }],
            assessmentId: 'assess123'
        };
        Result.findOne = jest.fn().mockResolvedValue(resp);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await resultController.getResult(req, res);
        expect(Result.findOne).toHaveBeenCalledWith({ _id: 'result123' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ result: resp });
    });
});

describe('updateResultById function', () => {
    it('should update a result and return the updated result', async () => {
        const mockUpdatedResult = { id: '123', assessmentId: '456', score: 90 };
        Result.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedResult);
        const req = {
            params: { id: '123' },
            body: { assessmentId: '456', score: 90 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await resultController.updateResultById(req, res);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "Result updated successfully",
            data: mockUpdatedResult
        });
    });
    it('should return 500 if an error occurs', async () => {
        Result.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Test Error'));
        const req = {
            params: { id: '123' },
            body: { assessmentId: '456', score: 90 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await resultController.updateResultById(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Server error' });
    });
});

/* describe('getResults function', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: { id: '123' } };
        res = { status: jest.fn().mockReturnThis(), send: jest.fn(), json: jest.fn() };
        next = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an error if no id is provided in params', async () => {
        req.params.id = undefined;

        await resultController.getResults(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('No id provided in params');
    });

    it('should return an error if the score is not found', async () => {
        jest.spyOn(Result, 'findOne').mockResolvedValueOnce(null);

        await resultController.getResults(req, res);

        expect(Result.findOne).toHaveBeenCalledWith({ _id: req.params.id });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error finding score');
    });

    it('should return an error if the assessment is not found', async () => {
        jest.spyOn(Result, 'findOne').mockResolvedValueOnce({ assessmentId: '456' });
        jest.spyOn(Assessment, 'findOne').mockResolvedValueOnce(null);

        await resultController.getResults(req, res);

        expect(Result.findOne).toHaveBeenCalledWith({ _id: req.params.id });
        expect(Assessment.findOne).toHaveBeenCalledWith({ _id: '456' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error getting assessment');
    });

    it('should return the score and assessment if found', async () => {
        jest.spyOn(Result, 'findOne').mockResolvedValueOnce({ assessmentId: '456' });
        jest.spyOn(Assessment, 'findOne').mockResolvedValueOnce({ name: 'Test Assessment' });

        await resultController.getResults(req, res);

        expect(Result.findOne).toHaveBeenCalledWith({ _id: req.params.id });
        expect(Assessment.findOne).toHaveBeenCalledWith({ _id: '456' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ score: { assessmentId: '456' }, assessment: { name: 'Test Assessment' } });
    });
}); */