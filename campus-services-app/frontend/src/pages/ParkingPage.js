import React, { useState, useEffect } from 'react';
import ParkingSelection from '../components/Parking/ParkingSelection';
import ParkingStatus from '../components/Parking/ParkingStatus';

const ParkingPage = () => {
    const [availableSpots, setAvailableSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Fetch available parking spots from the backend
        const fetchAvailableSpots = async () => {
            try {
                const response = await fetch('/api/parking/available-spots');
                const data = await response.json();
                setAvailableSpots(data);
            } catch (error) {
                console.error('Error fetching available spots:', error);
            }
        };

        fetchAvailableSpots();
    }, []);

    const handleSpotSelection = (spot) => {
        setSelectedSpot(spot);
        setStatus('Spot selected: ' + spot);
    };

    return (
        <div>
            <h1>Parking Services</h1>
            <ParkingSelection 
                availableSpots={availableSpots} 
                onSpotSelect={handleSpotSelection} 
            />
            <ParkingStatus status={status} />
        </div>
    );
};

export default ParkingPage;