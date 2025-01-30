# Campus Services App

## Overview
The Campus Services App is designed to automate and digitize common campus services, including canteen orders, printing requests, and parking allocations. This platform aims to streamline service delivery, reduce manual effort, and improve user convenience through a user-friendly web and mobile application.

## Features

### Canteen Service
- **Menu Management**: Admins can manage daily menus and order requests.
- **Order Tracking**: Students can place, track, and manage their canteen orders.
- **Ratings and Reviews**: Students can review and rate menu items, with insights available to admins.
- **Payment Integration**: Seamless payment processing for students, including cancellation options for unfulfilled requests.
- **Peak Time Prediction**: Admins can view peak times to optimize workforce management.

### Printing Service
- **Document Upload**: Students can upload documents and photos for printing.
- **Print Options**: Users can select the number of copies, print color (black & white or color), and orientation (portrait or landscape).

### Parking Service
- **Parking Allocation**: Users can select parking spots based on availability, with sections divided by area.
- **QR Code Integration**: Parking allocation is managed through ID cards and QR codes for easy access.

## Installation

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the database connection in `config.js`.
4. Start the server:
   ```
   node app.js
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ```

## Usage
- Access the application through the designated URL after starting both the backend and frontend servers.
- Students can log in to place orders, upload documents for printing, and select parking spots.
- Admins can manage orders, view analytics, and handle payments through the admin dashboard.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.