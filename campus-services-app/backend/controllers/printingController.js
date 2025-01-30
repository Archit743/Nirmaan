const express = require('express');
const router = express.Router();
const printingService = require('../services/printingService');

// Upload document for printing
router.post('/upload', async (req, res) => {
    try {
        const result = await printingService.uploadDocument(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get print options
router.get('/options', (req, res) => {
    const options = {
        colors: ['black and white', 'color'],
        orientations: ['portrait', 'landscape']
    };
    res.json(options);
});

// Create a print job
router.post('/create-job', async (req, res) => {
    try {
        const job = await printingService.createPrintJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get print job status
router.get('/status/:jobId', async (req, res) => {
    try {
        const status = await printingService.getPrintJobStatus(req.params.jobId);
        res.json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;