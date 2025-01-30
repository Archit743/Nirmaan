const PrintingJob = require('../models/printingModel');

const createPrintingJob = async (data) => {
    const { document, copies, color, orientation } = data;
    const newJob = new PrintingJob({
        document,
        copies,
        color,
        orientation,
        status: 'queued',
        createdAt: new Date(),
    });
    return await newJob.save();
};

const getPrintingJobs = async () => {
    return await PrintingJob.find();
};

const updatePrintingJobStatus = async (jobId, status) => {
    return await PrintingJob.findByIdAndUpdate(jobId, { status }, { new: true });
};

const deletePrintingJob = async (jobId) => {
    return await PrintingJob.findByIdAndDelete(jobId);
};

module.exports = {
    createPrintingJob,
    getPrintingJobs,
    updatePrintingJobStatus,
    deletePrintingJob,
};