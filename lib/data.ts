import { ChargingStation } from "./types";

export const mockStations: ChargingStation[] = [
  {
    id: "1",
    name: "NISHSHIFT Central Hub",
    address: "123 Electric Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    latitude: 40.7128,
    longitude: -74.0060,
    distance: 0.5,
    chargerTypes: ["Level 2", "DC Fast", "Tesla Supercharger"],
    pricePerKwh: 0.35,
    availability: "available",
    rating: 4.8,
    totalRatings: 234,
    workingHours: {
      open: "06:00",
      close: "22:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "WiFi", "Cafe", "Parking", "EV Service"],
    description: "Premium charging hub in the heart of Manhattan with multiple charging options and premium amenities.",
  },
  {
    id: "2",
    name: "Times Square Power Station",
    address: "456 Broadway",
    city: "New York",
    state: "NY",
    zipCode: "10036",
    latitude: 40.7580,
    longitude: -73.9855,
    distance: 1.2,
    chargerTypes: ["Level 2", "DC Fast"],
    pricePerKwh: 0.42,
    availability: "limited",
    rating: 4.5,
    totalRatings: 189,
    workingHours: {
      open: "24/7",
      close: "24/7",
      isOpen: true,
    },
    amenities: ["Restrooms", "WiFi", "Parking"],
    description: "Convenient charging station near Times Square, perfect for tourists and locals alike.",
  },
  {
    id: "3",
    name: "Brooklyn Heights Charger",
    address: "789 Court Street",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11231",
    latitude: 40.6960,
    longitude: -73.9930,
    distance: 2.8,
    chargerTypes: ["Level 1", "Level 2"],
    pricePerKwh: 0.28,
    availability: "available",
    rating: 4.6,
    totalRatings: 156,
    workingHours: {
      open: "08:00",
      close: "20:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "Parking"],
    description: "Neighborhood charging station with affordable rates and friendly service.",
  },
  {
    id: "4",
    name: "Queens Mall Supercharger",
    address: "321 Queens Boulevard",
    city: "Queens",
    state: "NY",
    zipCode: "11374",
    latitude: 40.7282,
    longitude: -73.7949,
    distance: 4.5,
    chargerTypes: ["Tesla Supercharger", "DC Fast"],
    pricePerKwh: 0.38,
    availability: "full",
    rating: 4.9,
    totalRatings: 312,
    workingHours: {
      open: "06:00",
      close: "23:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "WiFi", "Food Court", "Shopping", "Parking"],
    description: "Tesla Supercharger station at Queens Mall with shopping and dining options while you charge.",
  },
  {
    id: "5",
    name: "Jersey City Express",
    address: "555 Newark Avenue",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07302",
    latitude: 40.7178,
    longitude: -74.0431,
    distance: 3.2,
    chargerTypes: ["Level 2", "DC Fast"],
    pricePerKwh: 0.32,
    availability: "available",
    rating: 4.4,
    totalRatings: 98,
    workingHours: {
      open: "24/7",
      close: "24/7",
      isOpen: true,
    },
    amenities: ["Restrooms", "WiFi", "Parking"],
    description: "Quick charging station for commuters crossing between Jersey and NYC.",
  },
  {
    id: "6",
    name: "Hoboken Waterfront Station",
    address: "888 Hudson Street",
    city: "Hoboken",
    state: "NJ",
    zipCode: "07030",
    latitude: 40.7440,
    longitude: -74.0324,
    distance: 5.1,
    chargerTypes: ["Level 2"],
    pricePerKwh: 0.30,
    availability: "limited",
    rating: 4.3,
    totalRatings: 76,
    workingHours: {
      open: "07:00",
      close: "21:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "Parking", "River View"],
    description: "Scenic charging station with beautiful Hudson River views.",
  },
  {
    id: "7",
    name: "Bronx Terminal Market",
    address: "2400 Third Avenue",
    city: "Bronx",
    state: "NY",
    zipCode: "10451",
    latitude: 40.8276,
    longitude: -73.9254,
    distance: 6.8,
    chargerTypes: ["Level 2", "DC Fast"],
    pricePerKwh: 0.33,
    availability: "available",
    rating: 4.5,
    totalRatings: 134,
    workingHours: {
      open: "06:00",
      close: "22:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "WiFi", "Parking", "Market"],
    description: "Convenient charging at Bronx Terminal Market with easy highway access.",
  },
  {
    id: "8",
    name: "Staten Island Ferry Hub",
    address: "1 Bay Street",
    city: "Staten Island",
    state: "NY",
    zipCode: "10301",
    latitude: 40.6422,
    longitude: -74.0770,
    distance: 8.5,
    chargerTypes: ["Level 1", "Level 2"],
    pricePerKwh: 0.25,
    availability: "available",
    rating: 4.2,
    totalRatings: 67,
    workingHours: {
      open: "05:00",
      close: "01:00",
      isOpen: true,
    },
    amenities: ["Restrooms", "Parking", "Ferry Access"],
    description: "Budget-friendly charging near the Staten Island Ferry terminal.",
  },
];

export const getStationById = (id: string): ChargingStation | undefined => {
  return mockStations.find((station) => station.id === id);
};

export const getNearbyStations = (
  userLat: number,
  userLng: number,
  radius: number = 50
): ChargingStation[] => {
  return mockStations
    .map((station) => ({
      ...station,
      distance: calculateDistance(userLat, userLng, station.latitude, station.longitude),
    }))
    .filter((station) => station.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
