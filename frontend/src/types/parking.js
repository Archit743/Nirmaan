const ParkingSpot = {
    id: Number,
    section: String,
    spotNumber: Number,
    isAvailable: Boolean,
  };
  
  const ParkingSection = {
    id: String,
    name: String,
    description: String,
    totalSpots: Number,
    availableSpots: Number,
  };
  
  const ParkingBooking = {
    id: String,
    spotId: Number,
    userId: String,
    bookingTime: Date,
    confirmationCode: String,
    isActive: Boolean,
  };
  
  export { ParkingSpot, ParkingSection, ParkingBooking };
  