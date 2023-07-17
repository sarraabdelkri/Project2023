const express = require("express");
const router = express.Router();
const assessmentController = require('../controller/assessmentController');
// Routes pour les assessments
router.get('/getAllAssessment', assessmentController.getAllAssessment);
router.get('/getAssessment/:id', assessmentController.getAssessment);
router.get('/getMyAssessment/:id', assessmentController.getMyAssessment);
router.post('/createAssessment', assessmentController.createAssessment);
router.post('/addComment', assessmentController.addComment);
router.delete('/deleteComment', assessmentController.deleteComment);

router.post('/likeAssessment', assessmentController.LikeAssessment);
router.put('/updateAssessment/:id', assessmentController.updateAssessment);
router.delete('/deleteAssessment/:id', assessmentController.deleteAssessment);
router.get('/getAssessmentsByCourseName/:courseName', assessmentController.getAssessmentsByCourseName);


module.exports = router;
