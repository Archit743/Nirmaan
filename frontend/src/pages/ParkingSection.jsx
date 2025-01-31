import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const generateMockSpots = (sectionId) => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    section: sectionId,
    spotNumber: i + 1,
    isAvailable: Math.random() > 0.5,
  }));
};

const ParkingSectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    if (sectionId) {
      setSpots(generateMockSpots(sectionId));
    }
  }, [sectionId]);

  const handleSpotSelect = (spot) => {
    if (!spot.isAvailable) {
      toast({
        title: "Spot Unavailable",
        description: "This parking spot is already occupied.",
        variant: "destructive",
      });
      return;
    }
    setSelectedSpot(spot);
  };

  const handleBookSpot = () => {
    if (!selectedSpot) return;

    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    toast({
      title: "Spot Booked Successfully!",
      description: `Your confirmation code is: ${confirmationCode}`,
    });

    setSpots(spots.map(spot => 
      spot.id === selectedSpot.id ? { ...spot, isAvailable: false } : spot
    ));
    
    setSelectedSpot(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Parking Section {sectionId}</h1>
          <Button variant="outline" onClick={() => navigate("/parking")}>
            Back to Sections
          </Button>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {spots.map((spot) => (
            <Card
              key={spot.id}
              className={`p-4 text-center cursor-pointer transition-colors ${
                spot.isAvailable
                  ? "hover:bg-primary/10"
                  : "bg-gray-100 cursor-not-allowed"
              } ${
                selectedSpot?.id === spot.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSpotSelect(spot)}
            >
              {spot.spotNumber}
            </Card>
          ))}
        </div>

        {selectedSpot && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <p className="font-semibold">Selected Spot: {selectedSpot.spotNumber}</p>
                <p className="text-sm text-gray-600">Click confirm to book this spot</p>
              </div>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => setSelectedSpot(null)}>
                  Cancel
                </Button>
                <Button onClick={handleBookSpot}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ParkingSectionPage;
