export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  distance: number; // in km
  chargerTypes: ChargerType[];
  pricePerKwh: number;
  availability: "available" | "limited" | "full";
  rating: number;
  totalRatings: number;
  workingHours: {
    open: string;
    close: string;
    isOpen: boolean;
  };
  amenities: string[];
  imageUrl?: string;
  description: string;
}

export type ChargerType = "Level 1" | "Level 2" | "DC Fast" | "Tesla Supercharger";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  vehicles: Vehicle[];
  bookings: Booking[];
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  chargerType: ChargerType;
}

export interface Booking {
  id: string;
  stationId: string;
  stationName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: "confirmed" | "pending" | "completed" | "cancelled";
  price: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}
