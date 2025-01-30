import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CanteenOrder = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [orderStatus, setOrderStatus] = useState('');

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

    const handleQuantityChange = (itemId, quantity) => {
        setSelectedItems(prevState => ({
            ...prevState,
            [itemId]: quantity
        }));
    };

    const handleOrderSubmit = async () => {
        try {
            const orderDetails = {
                items: selectedItems,
            };
            const response = await axios.post('/api/canteen/order', orderDetails);
            setOrderStatus(response.data.message);
            setSelectedItems({});
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderStatus('Failed to place order. Please try again.');
        }
    };

    return (
        <div>
            <h2>Canteen Order</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        <span>{item.name} - ${item.price}</span>
                        <input
                            type="number"
                            min="0"
                            value={selectedItems[item.id] || 0}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={handleOrderSubmit}>Place Order</button>
            {orderStatus && <p>{orderStatus}</p>}
        </div>
    );
};

export default CanteenOrder;