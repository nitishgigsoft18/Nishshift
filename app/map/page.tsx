"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Navigation, Crosshair, List, ArrowLeft } from "lucide-react";
import { mockStations, getNearbyStations } from "@/lib/data";
import { ChargingStation } from "@/lib/types";

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyStations, setNearbyStations] = useState<ChargingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          const stations = getNearbyStations(location.lat, location.lng, 50);
          setNearbyStations(stations);
          setLoading(false);
        },
        (error) => {
          // console.error("Error getting location:", error);
          // Default to NYC location if geolocation fails
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          setUserLocation(defaultLocation);
          const stations = getNearbyStations(defaultLocation.lat, defaultLocation.lng, 50);
          setNearbyStations(stations);
          setLoading(false);
        }
      );
    } else {
      // Default to NYC location if geolocation not supported
      const defaultLocation = { lat: 40.7128, lng: -74.0060 };
      setUserLocation(defaultLocation);
      const stations = getNearbyStations(defaultLocation.lat, defaultLocation.lng, 50);
      setNearbyStations(stations);
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500";
      case "limited":
        return "bg-yellow-500";
      case "full":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "available":
        return "Available";
      case "limited":
        return "Limited";
      case "full":
        return "Full";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider hidden sm:inline">Back</span>
          </Link>
          <h1 className="orbitron text-lg sm:text-xl font-bold">Charging Map</h1>
          <Link
            href="/stations"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <List size={20} />
            <span className="text-sm uppercase tracking-wider hidden sm:inline">List View</span>
          </Link>
        </div>
      </div>

      {/* Map Container */}
      <div className="pt-16 sm:pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        {/* Map Visualization */}
        <div className="relative bg-zinc-900 rounded-2xl overflow-hidden h-[50vh] sm:h-[60vh] mb-4 border border-zinc-800">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-zinc-400">Detecting your location...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Simplified Map Visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900">
                {/* Grid lines for map effect */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-6 grid-rows-6 h-full">
                    {[...Array(36)].map((_, i) => (
                      <div key={i} className="border border-zinc-600"></div>
                    ))}
                  </div>
                </div>

                {/* User Location Marker */}
                {userLocation && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div>
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      You
                    </div>
                  </div>
                )}

                {/* Station Markers */}
                {nearbyStations.map((station, index) => {
                  // Calculate position based on distance (simplified)
                  const angle = (index * 45) * (Math.PI / 180);
                  const distance = Math.min(station.distance * 8, 35); // Scale distance
                  const top = 50 - Math.sin(angle) * distance;
                  const left = 50 + Math.cos(angle) * distance;

                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                        selectedStation?.id === station.id ? "z-20 scale-125" : "z-10"
                      }`}
                      style={{ top: `${top}%`, left: `${left}%` }}
                    >
                      <div className="relative">
                        <div className={`w-6 h-6 ${getAvailabilityColor(station.availability)} rounded-full border-2 border-white`}></div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-xs px-2 py-1 rounded font-medium">
                          {station.distance.toFixed(1)} km
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                  onClick={getUserLocation}
                  className="bg-white text-black p-3 rounded-full hover:bg-zinc-200 transition-colors shadow-lg"
                  title="Refresh Location"
                >
                  <Crosshair size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Selected Station Card */}
        {selectedStation && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {selectedStation.name}
                </h3>
                <p className="text-zinc-400 text-sm">{selectedStation.address}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedStation.availability === "available"
                  ? "bg-green-500/20 text-green-400"
                  : selectedStation.availability === "limited"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {getAvailabilityText(selectedStation.availability)}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Distance</p>
                <p className="text-white font-medium">{selectedStation.distance.toFixed(1)} km</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Price</p>
                <p className="text-white font-medium">${selectedStation.pricePerKwh}/kWh</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Rating</p>
                <p className="text-white font-medium">⭐ {selectedStation.rating}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Hours</p>
                <p className="text-white font-medium">{selectedStation.workingHours.open}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/stations/${selectedStation.id}`}
                className="flex-1 bg-white text-black py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-zinc-200 transition-colors text-center"
              >
                View Details
              </Link>
              <Link
                href={`/navigate/${selectedStation.id}`}
                className="flex-1 border border-white text-white py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-center flex items-center justify-center gap-2"
              >
                <Navigation size={18} />
                Navigate
              </Link>
            </div>
          </div>
        )}

        {/* Nearby Stations List */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white mb-3">Nearby Stations</h2>
          <div className="space-y-3">
            {nearbyStations.slice(0, 5).map((station) => (
              <button
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-left transition-all hover:border-zinc-600 ${
                  selectedStation?.id === station.id ? "border-white" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{station.name}</h3>
                    <p className="text-zinc-400 text-sm">{station.address}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-white font-medium">{station.distance.toFixed(1)} km</p>
                    <div className={`inline-flex items-center gap-1 text-xs ${
                      station.availability === "available"
                        ? "text-green-400"
                        : station.availability === "limited"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${getAvailabilityColor(station.availability)}`}></span>
                      {getAvailabilityText(station.availability)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/stations"
          className="block w-full bg-zinc-800 text-white py-4 rounded-xl font-medium uppercase tracking-wider hover:bg-zinc-700 transition-colors text-center"
        >
          View All Stations
        </Link>
      </div>
    </div>
  );
}
