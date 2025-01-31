import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/use-toast"; // Ensure this path is correct
import Page from "./pages/parkingpage";

function App() {
  console.log("App rendering");

  return (
    <Router>
      <div className="debug">Debug: App is rendering</div> 
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
