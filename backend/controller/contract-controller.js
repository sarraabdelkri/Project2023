const Contract = require("../model/Contract");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const AppError = require('../utils/appError')
const User = require("../model/userModel");
const Job = require("../model/job");
const mongoose = require('mongoose');


const getAllContracts = async (req, res, next) => {

  try {
    const contracts = await Contract.find().lean();

    for (const contract of contracts) {
      const job = await Job.findById(contract.job).select('title');
      const user = await User.findById(contract.user).select('name');

      contract.job = job;
      contract.user = user;
    }

    return res.status(200).json({ contracts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let contract;
  try {
    contract = await Contract.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!contract) {
    return res.status(404).json({ message: "No Contract found" });
  }
  return res.status(200).json({ contract });
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
  const { startDate, endDate, type } = req.body;
  const userId = req.params.userId;
  const jobId = req.params.jobId;
// (startDate, endDate, type, name, title) {
try {
const user = await User.findById(userId);
const job = await Job.findById(jobId);
if (!user) {
  throw new Error(`User with name  not found`);
}
if (!job) {
  throw new Error(`job with title  not found`);
}
console.log(user);
console.log(job);
const newContract = new Contract({
  startDate: startDate,
  endDate: endDate,
  type: type,
  user: user,
  job: job,
});
const savedContract = await newContract.save();
res.status(201).json(savedContract);
}
catch (error) {
res.status(500).json({ message: error.message });

}
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
const updateContract = async (req, res, next) => {
  const allowedStatuses = ["terminated", "cancelled", "Renewed"];
  const { status } = req.body;
  const { id } = req.params;

  try {
    const contract = await Contract.findById(id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    contract.contractstatus = status;
    if (status === "Renewed") {
      contract.renewedAt = Date.now();
    }
    if (status === "terminated") {
      contract.terminatedAt = Date.now();
    }
    await contract.save();

    res.status(200).json({ message: "Contract status updated successfully" });
  } catch (error) {
    next(error);
  }

};


exports.getAllContracts = getAllContracts;
exports.addContract = addContract;
exports.getById = getById;
exports.updateContract = updateContract;
exports.deleteContract = deleteContract;
exports.getByNameAndTitle = getByNameAndTitle;

// exports.ChangeStatus=ChangeStatus;
