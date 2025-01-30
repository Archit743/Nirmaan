"use client";
import React, { useState } from "react";

function ParkingPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const parkingAreas = [
    {
      id: 1,
      name: "Parking 1",
      location: "Backside of D Building",
      totalSpots: 100,
      availableSpots: 45,
    },
    {
      id: 2,
      name: "Parking 2",
      location: "Beside Sports Ground",
      totalSpots: 100,
      availableSpots: 30,
    },
    {
      id: 3,
      name: "Parking 3",
      location: "Near Main Gate",
      totalSpots: 100,
      availableSpots: 20,
    },
  ];

  const filteredAreas = parkingAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    const element = document.getElementById(`area-${area.id}`);
    if (element) {
      element.classList.add("scale-effect");
      setTimeout(() => {
        element.classList.remove("scale-effect");
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <style jsx global>{`
        .scale-effect {
          animation: scaleUp 0.2s ease-out;
        }

        @keyframes scaleUp {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-12 relative">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer hover:opacity-80 transition-opacity">
            CampusHub
          </div>

          <div className="hidden md:flex gap-6">
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 w-auto inline-grid">
              Profile
            </button>
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 w-auto inline-grid">
              Your Receipts
            </button>
          </div>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Campus Parking</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-600">
              Select a parking section to view and book available spots
            </p>
            <input
              type="text"
              placeholder="Search parking areas..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAreas.map((area) => (
            <div
              id={`area-${area.id}`}
              key={area.id}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-300 cursor-pointer hover:shadow-lg"
              onClick={() => handleAreaClick(area)}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">{area.name}</h2>
                <span className="text-white text-sm px-3 py-1 rounded-full bg-blue-600">
                  {area.availableSpots} Available
                </span>
              </div>
              <p className="text-gray-700 mb-4">{area.location}</p>
              <div className="text-gray-700">Total Spots: {area.totalSpots}</div>
            </div>
          ))}
        </div>

        {selectedArea && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{selectedArea.name}</h2>
                <button onClick={() => setSelectedArea(null)} className="text-gray-500 hover:text-gray-700">
                  ✖
                </button>
              </div>
              <p className="text-gray-700 mb-4">{selectedArea.location}</p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                onClick={() => setSelectedArea(null)}
              >
                Book Spot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingPage;
