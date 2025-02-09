// src/Components/AdminDashboard.js
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/canteen">Canteen Management</Link>
                    <Link to="/admin/printing">Printing Orders</Link>
                    <Link to="/admin/users">User Management</Link>
                    <button onClick={() => {
                        localStorage.removeItem('jwt');
                        navigate('/');
                    }}>Logout</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="canteen" element={<CanteenManagement />} />
                    <Route path="printing" element={<PrintingManagement />} />
                    <Route path="users" element={<UserManagement />} />
                </Routes>
            </div>
        </div>
    );
};

// Sub-components for different sections
const DashboardHome = () => (
    <div className="dashboard-home">
        <h1>Admin Overview</h1>
        <div className="stats-container">
            {/* Add statistics cards here */}
        </div>
    </div>
);

const CanteenManagement = () => {
    const [menuItems, setMenuItems] = React.useState([]);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        // Fetch menu items and orders
        fetch('https://nirmaan-yvtd.onrender.com/menu')
            .then(res => res.json())
            .then(data => setMenuItems(data));

        fetch('https://nirmaan-yvtd.onrender.com/orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div className="canteen-management">
            <div className="menu-management">
                <h2>Menu Items</h2>
                <AddMenuItemForm />
                <MenuItemList items={menuItems} />
            </div>
            
            <div className="order-management">
                <h2>Current Orders</h2>
                <OrderList orders={orders} />
            </div>
        </div>
    );
};

const PrintingManagement = () => {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        fetch('https://nirmaan-yvtd.onrender.com/Printorders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div className="printing-management">
            <h2>Printing Orders</h2>
            <PrintOrderList orders={orders} />
        </div>
    );
};

const UserManagement = () => {
    // Implement user management logic
    return <div>User Management Section</div>;
};

// Helper Components
const MenuItemList = ({ items }) => (
    <div className="menu-items">
        {items.map(item => (
            <div key={item._id} className="menu-item">
                <img src={item.photo} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>₹{item.price}</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        ))}
    </div>
);

const AddMenuItemForm = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        price: '',
        photo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://nirmaan-yvtd.onrender.com/menu/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(formData)
        });
    };

    return (
        <form onSubmit={handleSubmit} className="add-menu-form">
            <input type="text" placeholder="Item Name" required
                onChange={e => setFormData({...formData, name: e.target.value})} />
            <textarea placeholder="Description" required
                onChange={e => setFormData({...formData, description: e.target.value})} />
            <input type="number" placeholder="Price" required
                onChange={e => setFormData({...formData, price: e.target.value})} />
            <input type="url" placeholder="Image URL" required
                onChange={e => setFormData({...formData, photo: e.target.value})} />
            <button type="submit">Add Item</button>
        </form>
    );
};

const OrderList = ({ orders }) => (
    <div className="order-list">
        {orders.map(order => (
            <div key={order._id} className="order-item">
                <p>Order ID: {order._id}</p>
                <p>Status: {order.status}</p>
                <div className="order-actions">
                    <button onClick={() => updateOrderStatus(order._id, 'Accepted')}>
                        Accept
                    </button>
                    <button onClick={() => updateOrderStatus(order._id, 'Rejected')}>
                        Reject
                    </button>
                </div>
            </div>
        ))}
    </div>
);

const PrintOrderList = ({ orders }) => (
    <div className="print-orders">
        {orders.map(order => (
            <div key={order._id} className="print-order">
                <p>Document: {order.document}</p>
                <p>Copies: {order.copies}</p>
                <div className="print-actions">
                    <button onClick={() => handlePrintOrder(order._id, 'Accepted')}>
                        Accept
                    </button>
                    <button onClick={() => handlePrintOrder(order._id, 'Rejected')}>
                        Reject
                    </button>
                </div>
            </div>
        ))}
    </div>
);

export default AdminDashboard;