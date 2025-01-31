"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function ParkingSlot() {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingDate, setBookingDate] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [myBookings, setMyBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
  
    useEffect(() => {
      fetchParkingSlots();
      fetchUserBookings();
    }, []);
  
    useEffect(() => {
      if (successMessage) {
        const timer = setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [successMessage]);
  
    const fetchParkingSlots = async () => {
      try {
        const dummySlots = Array.from({ length: 100 }, (_, index) => ({
          id: index + 1,
          isAvailable: Math.random() > 0.3,
        }));
        setParkingSlots(dummySlots);
      } catch (err) {
        setError("Failed to fetch parking slots");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchUserBookings = async () => {
      try {
        const dummyBookings = [
          {
            id: 1,
            slotNumber: "90",
            date: "2025-02-20",
            status: "Active",
          },
        ];
        setMyBookings(dummyBookings);
      } catch (err) {
        setError("Failed to fetch bookings");
      }
    };
  
    const handleBookSlot = async () => {
      if (!selectedSlot) {
        setError("Please select a slot");
        return;
      }
  
      try {
        await fetch("/api/book-parking", {
          method: "POST",
          body: JSON.stringify({
            slotId: selectedSlot.id,
            userId: "user123",
          }),
        });
  
        setSuccessMessage("Parking slot booked successfully!");
        setSelectedSlot(null);
        fetchParkingSlots();
        fetchUserBookings();
      } catch (err) {
        setError("Failed to book parking slot");
      }
    };
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl font-roboto text-black">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
            <Header/>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-roboto text-black">
              Parking Section p1
            </h1>
            <button
              onClick={() => window.history.back()}
              className="bg-black text-white px-4 py-2 rounded font-roboto w-auto inline grid"
            >
              Back to Sections
            </button>
          </div>
  
          {successMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
              {successMessage}
            </div>
          )}
  
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
  
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-10 gap-4">
              {parkingSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => slot.isAvailable && setSelectedSlot(slot)}
                  className={`
                    p-3 rounded-lg text-center cursor-pointer border text-black
                    ${
                      slot.isAvailable
                        ? selectedSlot?.id === slot.id
                          ? "border-[#000000] border-8"
                          : "border-gray-800 hover:border-[#000000]"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                  `}
                >
                  <p className="font-roboto text-sm text-black">{slot.id}</p>
                </div>
              ))}
            </div>
          </div>
  
          {selectedSlot && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
              <p className="font-roboto text-black">Selected Spot: {selectedSlot.id}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="px-4 py-2 border rounded font-roboto text-black w-auto inline grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookSlot}
                  className="bg-[#0096FF] text-white px-4 py-2 rounded font-roboto w-auto inline grid"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
export default ParkingSlot;