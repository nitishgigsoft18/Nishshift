"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Navigation, MapPin, Clock, RotateCcw, ExternalLink } from "lucide-react";
import { getStationById } from "@/lib/data";
import { ChargingStation } from "@/lib/types";

export default function NavigatePage() {
  const params = useParams();
  const router = useRouter();
  const station = getStationById(params.id as string) as ChargingStation;
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string>("");

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
          // Estimate time based on distance (simplified)
          const timeInMinutes = Math.round(station.distance * 3); // Rough estimate: 3 minutes per km
          setEstimatedTime(`${timeInMinutes} min`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setEstimatedTime(`${Math.round(station.distance * 3)} min`);
        }
      );
    } else {
      setEstimatedTime(`${Math.round(station.distance * 3)} min`);
    }
  };

  const openGoogleMaps = () => {
    if (station) {
      const destination = `${station.latitude},${station.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
      window.open(url, "_blank");
    }
  };

  const openAppleMaps = () => {
    if (station) {
      const url = `http://maps.apple.com/?daddr=${station.latitude},${station.longitude}`;
      window.open(url, "_blank");
    }
  };

  if (!station) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Station Not Found</h1>
          <Link href="/stations" className="text-zinc-400 hover:text-white">
            Back to Stations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/stations/${station.id}`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back to Station</span>
          </Link>
        </div>

        {/* Navigation Header */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Navigation className="text-blue-400" size={32} />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl sm:text-3xl font-light text-white mb-1">
                Navigate to {station.name}
              </h1>
              <p className="text-zinc-400 text-sm">{station.address}</p>
            </div>
          </div>

          {/* Route Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Distance</p>
              <p className="text-white text-xl font-semibold">{station.distance.toFixed(1)} km</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Est. Time</p>
              <p className="text-white text-xl font-semibold">{estimatedTime}</p>
            </div>
            <div className="bg-zinc-800/50 rounded-xl p-4 col-span-2 sm:col-span-1">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Status</p>
              <p className="text-white text-xl font-semibold">
                {station.availability === "available" ? "Available" : station.availability === "limited" ? "Limited" : "Full"}
              </p>
            </div>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden mb-6">
          <div className="relative h-[50vh] sm:h-[60vh] bg-gradient-to-br from-zinc-800 to-zinc-900">
            {/* Grid lines for map effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-6 grid-rows-6 h-full">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border border-zinc-600"></div>
                ))}
              </div>
            </div>

            {/* Route Visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Start point (user) */}
              <circle cx="20" cy="70" r="3" fill="#3b82f6" />
              <text x="20" y="65" fill="#3b82f6" fontSize="3" textAnchor="middle">You</text>
              
              {/* End point (station) */}
              <circle cx="80" cy="30" r="3" fill="#22c55e" />
              <text x="80" y="25" fill="#22c55e" fontSize="3" textAnchor="middle">Station</text>
              
              {/* Route line */}
              <path
                d="M 20 70 Q 50 50 80 30"
                stroke="#3b82f6"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="2,1"
              />
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-white">Your Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">Destination</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Open in Maps App</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={openGoogleMaps}
              className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="text-zinc-400" size={20} />
              <div className="text-left">
                <p className="text-white font-medium">Google Maps</p>
                <p className="text-zinc-400 text-sm">Open in browser</p>
              </div>
            </button>
            <button
              onClick={openAppleMaps}
              className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
            >
              <ExternalLink className="text-zinc-400" size={20} />
              <div className="text-left">
                <p className="text-white font-medium">Apple Maps</p>
                <p className="text-zinc-400 text-sm">Open in app</p>
              </div>
            </button>
          </div>
        </div>

        {/* Station Info Summary */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Destination Details</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-zinc-400 mt-1" size={20} />
              <div>
                <p className="text-white font-medium">{station.name}</p>
                <p className="text-zinc-400 text-sm">{station.address}</p>
                <p className="text-zinc-400 text-sm">{station.city}, {station.state} {station.zipCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-zinc-400" size={20} />
              <div>
                <p className="text-white font-medium">{station.workingHours.open} - {station.workingHours.close}</p>
                <p className="text-zinc-400 text-sm">
                  {station.workingHours.isOpen ? "Currently Open" : "Currently Closed"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800">
            <Link
              href={`/booking/${station.id}`}
              className="inline-flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-zinc-200 transition-colors"
            >
              Book a Charging Slot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
