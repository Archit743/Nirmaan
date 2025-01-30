import { useState } from "react";
import Layout from "../components/layout";
import ParkingSectionCard from "../components/parkingSectionCard";

const MOCK_PARKING_SECTIONS = [
  {
    id: "p1",
    name: "Parking 1",
    description: "Backside of D Building",
    totalSpots: 100,
    availableSpots: 45,
  },
  {
    id: "p2",
    name: "Parking 2",
    description: "Beside Sports Ground",
    totalSpots: 100,
    availableSpots: 30,
  },
  {
    id: "p3",
    name: "Parking 3",
    description: "Near Main Gate",
    totalSpots: 100,
    availableSpots: 20,
  },
];

const ParkingPage = () => {
  const [sections] = useState(MOCK_PARKING_SECTIONS);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Campus Parking</h1>
          <p className="text-gray-600 mt-2">
            Select a parking section to view and book available spots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <ParkingSectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParkingPage;
