import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "./components/ui/toaster";
import ParkingPage from "./pages/Parking";
import ParkingSectionPage from "./pages/ParkingSection";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
// import NotFound from "./pages/NotFound";

function App() {
  console.log("App rendering"); 0

  return (
    <Router>
      <div className="debug">Debug: App is rendering</div> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/parking/:sectionId" element={<ParkingSectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;