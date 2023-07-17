const Job = require("../model/job");

const getAllJobs = async (req, res, next) => {
    let job;
    try {
        job = await Job.find().populate('employer');
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "No job found" })
    }
    return res.status(200).json({ job });
};

const getJobById = async (req, res, next) => {
    const id = req.params.id;
    let job;
    try {
        job = await Job.findById(id).populate("employer");
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "No job found" })
    }
    return res.status(200).json({ job });

};

const addJob = async (req, res, next) => {
    const { title, workplaceType, location, jobType, requiredSkills, aboutJob } = req.body;
    let job;
    try {
        job = new Job({
            employer:req.auth.userId, // Get the ID of the authenticated user from the JWT token
            title,
            workplaceType,
            location,
            jobType,
            requiredSkills,
            aboutJob,
        });
        await job.save();
        
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(500).json({ message: "Unable to add" })
    }
    return res.status(201).json({ job });

};

const updateJob = async (req, res, next) => {
    const id = req.params.id;
    const { title, workplaceType, location, jobType, requiredSkills, aboutJob } = req.body;
    let job;
    try {
        job = await Job.findByIdAndUpdate(id, {
            title,
            workplaceType,
            location,
            jobType,
            requiredSkills,
            aboutJob,
        });
        job = await job.save();
        
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ job });
};

const deleteJob = async (req, res, next) => {
    const id = req.params.id;
    let job;
    try {
        job = await Job.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }
    if (!job) {
        return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "job Successfully Deleted" });
};

module.exports = {
    getAllJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob
  };