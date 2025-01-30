import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingStatus = () => {
    const [parkingStatus, setParkingStatus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParkingStatus = async () => {
            try {
                const response = await axios.get('/api/parking/status');
                setParkingStatus(response.data);
            } catch (error) {
                console.error('Error fetching parking status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParkingStatus();
    }, []);

    if (loading) {
        return <div>Loading parking status...</div>;
    }

    return (
        <div>
            <h2>Parking Status</h2>
            <ul>
                {parkingStatus.map((spot) => (
                    <li key={spot.id}>
                        Spot {spot.number}: {spot.isAvailable ? 'Available' : 'Occupied'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingStatus;