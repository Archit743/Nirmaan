import React, { useState } from 'react';

const PrintOptions = () => {
    const [copies, setCopies] = useState(1);
    const [color, setColor] = useState('black-and-white');
    const [orientation, setOrientation] = useState('portrait');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the submission of print options
        console.log(`Copies: ${copies}, Color: ${color}, Orientation: ${orientation}`);
    };

    return (
        <div>
            <h2>Select Print Options</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Submit Print Options</button>
            </form>
        </div>
    );
};

export default PrintOptions;