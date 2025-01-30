import React, { useState } from 'react';
import axios from 'axios';

const PrintUpload = () => {
    const [file, setFile] = useState(null);
    const [copies, setCopies] = useState(1);
    const [color, setColor] = useState('black-and-white');
    const [orientation, setOrientation] = useState('portrait');
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('copies', copies);
        formData.append('color', color);
        formData.append('orientation', orientation);

        try {
            const response = await axios.post('/api/printing/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading file. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Document for Printing</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <div>
                    <label>
                        Number of Copies:
                        <input
                            type="number"
                            value={copies}
                            onChange={(e) => setCopies(e.target.value)}
                            min="1"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Print Color:
                        <select value={color} onChange={(e) => setColor(e.target.value)}>
                            <option value="black-and-white">Black and White</option>
                            <option value="color">Color</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Print Orientation:
                        <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PrintUpload;