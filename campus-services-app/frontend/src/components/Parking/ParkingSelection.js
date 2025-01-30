import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParkingSelection = () => {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [selectedSpot, setSelectedSpot] = useState(null);

    useEffect(() => {
        const fetchParkingSpots = async () => {
            try {
                const response = await axios.get('/api/parking/spots');
                setParkingSpots(response.data);
            } catch (error) {
                console.error('Error fetching parking spots:', error);
            }
        };

        fetchParkingSpots();
    }, []);

    const handleSpotSelection = (spot) => {
        setSelectedSpot(spot);
    };

    const handleBooking = async () => {
        if (selectedSpot) {
            try {
                await axios.post('/api/parking/book', { spotId: selectedSpot.id });
                alert('Parking spot booked successfully!');
            } catch (error) {
                console.error('Error booking parking spot:', error);
                alert('Failed to book parking spot.');
            }
        } else {
            alert('Please select a parking spot.');
        }
    };

    return (
        <div>
            <h2>Select a Parking Spot</h2>
            <ul>
                {parkingSpots.map((spot) => (
                    <li key={spot.id}>
                        <button onClick={() => handleSpotSelection(spot)}>
                            {spot.name} - {spot.available ? 'Available' : 'Occupied'}
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleBooking}>Book Selected Spot</button>
        </div>
    );
};

export default ParkingSelection;