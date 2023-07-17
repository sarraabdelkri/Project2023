const express = require("express");
const router = express.Router();
const contract = require("../model/Contract");
const contractController = require("../controller/contract-controller");
const pdf = require('html-pdf');
const pdfTemplate = require('../documents/index');
const Contract = require("../model/Contract");
const User = require("../model/userModel");
const Atelier = require("../model/atelier");
const Job = require("../model/job");

const path = require('path');

router.get("/getAllContracts", contractController.getAllContracts);
router.post("/contracts/:userId/:jobId/:atelierId", contractController.addContract);
router.post("/contract/:userId/:jobId/:atelierId", contractController.addContracts);
// router.post("/contracts/:userId/:postId", contractController.addContract);
router.get('/contracts/user/:userName/title/:postTitle', contractController.getByNameAndTitle);
router.get("/:id", contractController.getById);
router.get("/employer/:id", contractController.getcontractById);
router.put("/contracts/:id", contractController.updateContract);
router.delete("/contracts/:id", contractController.deleteContract);
router.get("/user/:userId", contractController.getByIduser);
router.get("/job/:jobId", contractController.getByIdjob);
router.get("/contracts/:id", contractController.getContract);

router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});
router.get('/fetch-pdf/:userId', async (req, res) => {
  
    const user = await Contract.findById(req.params.userId);
      if (!contract) {
      return res.status(404).json({ message: "No Contract found" });
      }
      
   // Check if the contract variable is populated with the expected data
  const filePath = path.join(__dirname, '../result.pdf');
  res.sendFile(filePath); 
  
  })

router.get('/fetch-pdf/:userId/:jobId/:atelierId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const job = await Job.findById(req.params.jobId);
    const atelier = await Atelier.findById(req.params.atelierId);
 if (!user || !job || !atelier) {
    return res.status(404).json({ message: "No Contract found" });
  }


 // Check if the contract variable is populated with the expected data
const filePath = path.join(__dirname, '../result.pdf');
res.sendFile(filePath); 

})

module.exports = router;