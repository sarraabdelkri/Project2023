const Contract = require("../model/Contract");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const AppError = require('../utils/appError')
const User = require("../model/userModel");
const Atelier = require("../model/atelier");
const Job = require("../model/job");
const mongoose = require('mongoose');
const pdf = require('html-pdf');
const fs = require('fs');
const pdfTemplate = require('../documents/index');






const getAllContracts = async (req, res, next) => {

  try {
        const contracts = await Contract.find().populate({
      path: "user",
      match: { role: "student" }
    });

    for (const contract of contracts) {
      const job = await Job.findById(contract.job).populate('employer', 'name').select('title jobType location');
      const user = await User.findById(contract.user).select('name');
      const atelier = await Atelier.findById(contract.atelier).select('title description');

      contract.job = job;
      contract.user = user;
      contract.atelier = atelier;
    }

    return res.status(200).json({ contracts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getcontractById = async (req, res, next) => {
  const { employerId } = req.params;

  try {
    const contracts = await Contract.find()
      .populate({
        path: "job",
        populate: {
          path: "employer",
          match: { _id: employerId },
          select: "name"
        }
      })
      .populate("user")
      .populate("atelier");

    const filteredContracts = contracts.filter(
      contract => contract.job && contract.job.employer
    );

    return res.status(200).json({ contracts: filteredContracts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


const getById = async (req, res, next) => {
  const id = req.params.id;
  let contract;
  // let c;
  try {
    contract = await Contract.findById(id).populate("user");
    if (contract) {
      if (mongoose.Types.ObjectId.isValid(contract.job)) {
        const job = await Job.findById(contract.job).select('title jobType location');
        contract.job = job;
      }
      if (mongoose.Types.ObjectId.isValid(contract.user)) {
        const user = await User.findById(contract.user).select('name');
        contract.user = user;
      }
      if (mongoose.Types.ObjectId.isValid(contract.atelier)) {
        const atelier = await Atelier.findById(contract.atelier).select('title description');
        contract.atelier = atelier;
      }
    }

  } catch (err) {
    console.log(err);
  }
  if (!contract) {
    return res.status(404).json({ message: "No Contract found" });
  }
  return res.status(200).json({ contract});
};


const getcontractByIduser = async (req, res, next) => {
  const {  userId } = req.params;

  try {
    const contract = await Contract.findById(userId)
      .populate({
        path: "job",
        populate: {
          path: "employer",
          match: { _id: employerId },
          select: "name"
        }
      })
      .populate("user")
      .populate("atelier");

    if (!contract) {
      return res.status(404).json({ message: "No Contract found" });
    }

    return contract;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


const getByNameAndTitle = async (req, res, next) => {
  const userName = req.params.name;
  const jobTitle = req.params.title;
  let contracts; 
  try {
    contracts = await Contract.find({ name: userName, title: jobTitle });
  } catch (err) {
    console.log(err);
  }
  if (!contracts || contracts.length === 0) {
    return res.status(404).json({ message: "No contracts found" });
  }
  return res.status(200).json({ contracts });
};



const addContract = async (req, res) => {
  try {
    const { startDate, endDate, type, contractstatus } = req.body;
    const { userId, jobId, atelierId } = req.params;

    const [user, job, atelier] = await Promise.all([
      User.findById(userId),
      Job.findById(jobId),
      Atelier.findById(atelierId),
    ]);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if (!job) {
      throw new Error(`Job with ID ${jobId} not found`);
    }
    if (!atelier) {
      throw new Error(`Atelier with ID ${atelierId} not found`);
    }

    const newContract = new Contract({
      startDate,
      endDate,
      contractstatus,
      user,
      job,
      atelier,
    });

    const savedContract = await newContract.save();
    res.status(201).json(savedContract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addContracts = async (req, res) => {
  try {
    const { startDate, endDate, type, contractstatus,salary } = req.body;
    const { userId, jobId, atelierId } = req.params;

    const [user, job, atelier] = await Promise.all([
      User.findById(userId),
      Job.findById(jobId),
      Atelier.findById(atelierId),
    ]);

    if (user.role !== "student") {
      throw new Error(`User with name not found`);
    }
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    if (!job) {
      throw new Error(`job with title not found`);
    }
    if (!atelier) {
      throw new Error(`atelier with description`);
    }

    // Create the PDF here
    pdf.create(pdfTemplate(req.body), {}).toBuffer(async (err, buffer) => {
      if (err) {
        throw new Error(`Error creating PDF: ${err.message}`);
      }

      const newContract = new Contract({
        startDate: startDate,
        endDate: endDate,
        contractstatus: contractstatus,
        salary: salary,
        user: user,
        job: job,
        atelier: atelier,
      
      });

      const savedContract = await newContract.save();


      // Save the PDF to a file
      fs.writeFile('result.pdf', buffer, (err) => {
        if (err) {
          throw new Error(`Error saving PDF: ${err.message}`);
        }
      
        // Return the PDF as a response
        res.status(200)
          .header('Content-Type', 'application/pdf')
          .header('Content-Disposition', 'attachment; filename=result.pdf')
          .send(buffer);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateContract = async (req, res, next) => {
  const allowedStatuses = ["cancelled", "Renewed"];
  const { contractstatus } = req.body;
  const { id } = req.params;

  try {
    let contract = await Contract.findById(id);


    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (!allowedStatuses.includes(contractstatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    contract.contractstatus = contractstatus;

    if (contractstatus === "Renewed") {
      contract.renewedAt = Date.now();

      // Add 3 months to the renewedAt date to get the end date
      const endDate = new Date(contract.renewedAt);
      endDate.setMonth(endDate.getMonth() + 6);
      contract.endDate = endDate;
    }

    if (contractstatus === "cancelled") {
      contract.terminatedAt = Date.now();
    }

    await contract.save();
    contract = await Contract.findById(id)
    .populate("user", " name salary startdate")
    .populate({
      path: "job",
      select: "title jobType location employer",
      populate: {
        path: "employer",
        select: "name"
      }
    })
    .populate("atelier", "title description");

  console.log(contract);

    try {
      pdf.create(pdfTemplate(contract), {}).toBuffer(async (err, buffer) => {
        if (err) {
          throw new Error(`Error creating PDF: ${err.message}`);
        }

       
    // Create a PDF file with the updated contract data
  

        // Send the PDF file in the response
        fs.writeFile('result.pdf', buffer, (err) => {
          if (err) {
            throw new Error(`Error saving PDF: ${err.message}`);
          }
      
          // Send the PDF file in the response
          res.status(200)
            .set('Content-Type', 'application/pdf')
            .set('Content-Disposition', 'attachment; filename=result.pdf')
            .send(buffer);
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error creating PDF" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContract = async (req, res, next) => {
  const id = req.params.id;



  try {
    const contract = await Contract.findById(id)
      .populate("user", "name salary startdate")
      .populate({
        path: "job",
        select: "title jobType location employer",
        populate: {
          path: "employer",
          select: "name"
        }
      })
      .populate("atelier", "title description");

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    pdf.create(pdfTemplate(contract), {}).toBuffer(async (err, buffer) => {
      if (err) {
        return res.status(500).json({ message: "Error creating PDF" });
      }

      const filePath = path.join(__dirname, '../result.pdf');
      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error saving PDF" });
        }

        res.status(200)
          .set('Content-Type', 'application/pdf')
          .set('Content-Disposition', 'attachment; filename=result.pdf')
          .sendFile(filePath);
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const getByIduser = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No Contract found" });
  }
  return res.status(200).json({ user });

};
const getByIdjob= async (req, res, next) => {
  const jobId = req.params.jobId;
  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    console.log(err);
  }
  if (!job) {
    return res.status(404).json({ message: "No Contract found" });
  }
  return res.status(200).json({ job });
};
const deleteContract = async (req, res, next) => {
  const contractId = req.params.id;
 
  let contract;

  try {
    // Find the contract by its ID
    contract = await Contract.findOneAndDelete({ _id: contractId });
    console.log(contract);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete contract" });
  }

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  return res.status(200).json({ message: "Contract successfully deleted" });
}



exports.getAllContracts = getAllContracts;
exports.addContract = addContract;
exports.getByIdjob = getByIdjob;
exports.getByIduser = getByIduser;
exports.getById = getById;
exports.updateContract = updateContract;
exports.deleteContract = deleteContract;
exports.getByNameAndTitle = getByNameAndTitle;
exports.addContracts= addContracts;
exports.getcontractById = getcontractById;
exports.getcontractByIduser = getcontractByIduser;
exports.getContract = getContract;


// exports.ChangeStatus=ChangeStatus;