import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CanteenMenu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/api/canteen/menu');
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);

    return (
        <div>
            <h2>Canteen Menu</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CanteenMenu;