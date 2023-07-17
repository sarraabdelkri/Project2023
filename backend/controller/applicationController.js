const Application = require('../model/application');
const Job = require('../model/job');
const userModel = require('../model/userModel');

const getallapplications = async (req, res) => {
    let application;
    try {
        application = await Application.find().populate('job');
    } catch (err) {
        console.log(err); 
    }
    if (!application || application.length === 0) {
        return res.status(404).json({ message: "No application found" })
    }
    return res.status(200).json({ application });
};

const createApplication = async (req, res) => {
    const { jobId } = req.params;
    const { userId } = req.auth;

    
    // Check if the user has any accepted applications
    const hasAcceptedApplications = await Application.exists({
      student: userId,
      status: "accepted"
    });
  
    if (hasAcceptedApplications) {
      return res.status(400).json({
        message: "You cannot apply for a new job until your previous application is finished"
      });
    }
  
    // Check if the user has already applied to the same job
    const hasAppliedToJob = await Application.exists({
      student: userId,
      job: jobId,
    });
  
    if (hasAppliedToJob) {
      return res.status(400).json({
        message: "You have already applied to this job"
      });
    }
    const job = await Job.findById(jobId);
    const user = await userModel.findById(userId);
    // Create the new application object and save it to the database
    let application;
    try {
      application = new Application({
        student: userId,
        job: jobId,
        employer: job.employer,
      });
      job.applied += 1;
      await job.save();
      await application.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Unable to add application"
      });
    }
  
    return res.status(201).json({
      application
    });
  };


  const getApplicationsByJobId = async (req, res) => {
    const { jobId } = req.params;
    try {
      const applications = await Application.find({ job: jobId }).populate('student');
      return res.status(200).json({ applications });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Unable to get applications' });
    }
  };
  
  const getApplicationsByStudentId = async (req, res) => {
    const { userId } = req.params;
    try {
      const applications = await Application.find({ student: userId }).populate('job');
      return res.status(200).json({ applications });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Unable to get applications' });
    }
  };

  const deleteApplication = async (req, res) => {
    const { applicationId } = req.params;
  
    try {
      const application = await Application.findByIdAndRemove(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      const job = await Job.findById(application.job);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      job.applied -= 1;
      await job.save();
  
      return res.status(200).json({ message: "Application deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Unable to delete application" });
    }
  };


module.exports = { getallapplications,createApplication,getApplicationsByJobId,getApplicationsByStudentId,deleteApplication };
