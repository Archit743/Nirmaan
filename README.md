# CampusHub

## Project Overview
CampusHub is a platform designed to automate and digitize essential campus services like printing requests and canteen orders. The solution aims to streamline service delivery, reduce manual effort, and enhance user convenience.

## Features Implemented
### 1. User Authentication
- **User Registration**: Allows students to register with name, email, password, and username.
- **User Login**: Provides authentication using JWT tokens.
- **Admin Authentication**: Separate login functionality for admins to manage canteen and printing services.

### 2. Canteen Management System
- **Browse Menu**: Students can view the available menu items.
- **Add Items to Menu**: Admins can add new food items with descriptions, prices, ratings, and images.
- **Place Orders**: Users can order items from the canteen.
- **Order Status Management**: Admins can accept or reject orders.
- **Automatic Order Rejection**: Orders that are not accepted within 10 minutes are automatically canceled.
- **Payment Integration Simulation**: Users can mark an order as paid after acceptance.
- **Order Cancellation & Refund**: Users can cancel orders and receive a refund based on the payment status.

### 3. Printing Request System
- **Upload Documents**: Users can upload documents for printing.
- **Specify Printing Preferences**: Users can specify color mode (black & white or color) and number of copies.
- **Order Tracking**: Users can check the status of their printing requests.
- **Admin Dashboard for Printing**: Admins can accept or reject printing orders.

## Future Enhancements
- **AI-based Peak Time Prediction**: Suggest optimal times for placing canteen orders to avoid long waits.
- **Chatbot Integration**: Automate handling of student queries and requests.
- **Payment System Integration**: Seamless transactions for canteen and printing services.
- **Table Booking for Canteen**: Allow students to reserve tables in advance.

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, bcrypt
- **File Uploads**: Multer
- **Frontend (Planned)**: React.js

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/campushub.git
   cd campushub
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string:
   ```sh
   MONGOURI=your_mongodb_connection_string
   ```
4. Start the server:
   ```sh
   node server.js
   ```

## API Endpoints
### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login for users
- `POST /admin/login` - Login for admins

### Canteen Services
- `GET /menu` - Fetch the menu items
- `POST /menu/add` - Add a new menu item (Admin)
- `POST /order` - Place an order
- `PUT /order/:id/status` - Update order status (Admin)
- `POST /payment/:orderId` - Simulated payment processing
- `POST /order/:id/cancel` - Cancel an order

### Printing Services
- `POST /upload` - Upload a document for printing
- `GET /Printorders` - Fetch all printing orders (Admin)
- `PUT /accept/:id` - Accept a print order (Admin)
- `PUT /reject/:id` - Reject a print order (Admin)

## Contributors
- **Your Name**
- **Your Team Members (if any)**

## License
This project is open-source and available under the MIT License.

