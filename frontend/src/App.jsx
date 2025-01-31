import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ParkingPage from "@/pages/Parking";
import ParkingSectionPage from "@/pages/ParkingSection";
import ProfilePage from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParkingPage />} />
        <Route path="/parking" element={<ParkingPage />} />
        <Route path="/parking/:sectionId" element={<ParkingSectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
