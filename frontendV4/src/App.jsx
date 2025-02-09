// src/App.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Styles/HomePage.css";
// import "./Styles/DomainsPage.css";
// import "./Styles/VideoPage.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryPage from './pages/EntryPage';
import CanteenPage from './pages/CanteenPage';
import LandingPage from './pages/LandingPage';
import ParkingPage from './pages/ParkingPage';
import PrintPage from './pages/PrintPage';
import ParkingSlot from './pages/ParkingSlot';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
// import AdminMenuPage from './pages/AdminMenuPage'
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>
                } />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/parkingSlot" element={<ParkingSlot />} />
        <Route path="/print" element={<PrintPage />} />
        <Route path="/canteen" element={<CanteenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
