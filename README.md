# Canteen Management System

## Overview
The Canteen Management System is a web-based application that allows students to browse the canteen menu, place orders, and make payments. Admins can manage menu items, process orders, and handle payments. Additionally, the system supports document printing services.

## Features
### User Features
- User registration and authentication (JWT-based login system)
- Browse the canteen menu
- Add items to the cart and place orders
- View order history and status
- Upload documents for printing

### Admin Features
- Manage menu items (add, edit, delete)
- Process orders (accept/reject)
- Handle payment status updates
- Manage printing service requests

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing
- **File Uploads:** Multer
- **Frontend:** (To be integrated with React)
- **Environment Variables:** dotenv

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB

### Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/canteen-management.git
   cd canteen-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   MONGOURI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   node server.js
   ```
   The server will run on `http://localhost:5000`

## API Endpoints
### Authentication
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /admin/login` - Admin login

### Menu Management
- `GET /menu` - Fetch all menu items
- `POST /menu/add` - Add a new menu item (Admin)

### Order Management
- `POST /order` - Place an order
- `PUT /order/:id/status` - Accept/Reject order (Admin)
- `POST /payment/:orderId` - Simulate payment processing
- `POST /order/:id/cancel` - Cancel an order

### Printing Service
- `POST /upload` - Upload a document for printing
- `GET /Printorders` - Fetch print orders (Admin)
- `PUT /accept/:id` - Accept print order (Admin)
- `PUT /reject/:id` - Reject print order (Admin)

## Folder Structure
```
📂 canteen-management
 ├── 📂 uploads            # Stores uploaded documents
 ├── 📜 server.js         # Main backend server file
 ├── 📜 .env              # Environment variables
 ├── 📜 package.json      # Project dependencies
 ├── 📜 README.md         # Project documentation
```

## License
This project is licensed under the MIT License.

