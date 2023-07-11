const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');
// Routes pour les assessments
router.post('/saveResult', resultController.saveResult);
router.get('/getResults', resultController.getAllResults);
router.get('/:userId', resultController.getResultsByUserId);
router.get('/:courseId', resultController.getResultsByAssementId);
router.delete('/:id', resultController.deleteResultById);
router.put("/:id", resultController.updateResultById);


module.exports = router;
