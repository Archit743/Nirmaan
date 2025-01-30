const express = require('express');
const router = express.Router();
const printingController = require('../controllers/printingController');

// Route to upload a document for printing
router.post('/upload', printingController.uploadDocument);

// Route to get print options
router.get('/options', printingController.getPrintOptions);

// Route to queue a printing job
router.post('/queue', printingController.queuePrintJob);

// Route to get the status of a printing job
router.get('/status/:jobId', printingController.getPrintJobStatus);

// Route to cancel a printing job
router.delete('/cancel/:jobId', printingController.cancelPrintJob);

module.exports = router;