const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');
// Routes pour les assessments
router.post('/saveResult', resultController.saveResult);
router.get('/getResult/:id', resultController.getResult);
router.get('/getResults', resultController.getAllResults);
router.get('/getResultsByUserId/:userId', resultController.getResultsByUserId);
router.get('/getResultsAndAssessmentsByUserId/:userId', resultController.getResultsAndAssessmentsByUserId);

router.get('/getResultsByAssementId/:assessmentId', resultController.getResultsByAssementId);
router.delete('/:id', resultController.deleteResultById);
router.put("/:id", resultController.updateResultById);
router.get('/results/:id', resultController.getResults);

module.exports = router;
