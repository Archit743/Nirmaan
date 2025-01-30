import React, { useState } from 'react';
import PrintUpload from '../components/Printing/PrintUpload';
import PrintOptions from '../components/Printing/PrintOptions';

const PrintingPage = () => {
    const [printJob, setPrintJob] = useState(null);
    const [printOptions, setPrintOptions] = useState({ color: 'black', orientation: 'portrait' });

    const handleUpload = (file) => {
        setPrintJob(file);
    };

    const handleOptionsChange = (options) => {
        setPrintOptions(options);
    };

    const handleSubmit = () => {
        // Logic to submit the print job and options to the backend
    };

    return (
        <div>
            <h1>Printing Service</h1>
            <PrintUpload onUpload={handleUpload} />
            <PrintOptions onChange={handleOptionsChange} />
            <button onClick={handleSubmit} disabled={!printJob}>
                Submit Print Job
            </button>
        </div>
    );
};

export default PrintingPage;