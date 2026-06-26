"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Navigation, Star, Clock, MapPin, Zap, Wifi, Coffee, Car, Phone, Calendar, Check } from "lucide-react";
import { getStationById } from "@/lib/data";
import { ChargingStation } from "@/lib/types";

export default function StationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const station = getStationById(params.id as string) as ChargingStation;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

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

  const handleBookNow = () => {
    router.push(`/booking/${station.id}`);
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/stations"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back to Stations</span>
          </Link>
        </div>

        {/* Station Hero */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden mb-6">
          {/* Image Placeholder */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-zinc-700 w-24 h-24 sm:w-32 sm:h-32" />
            </div>
            <div className="absolute top-4 right-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                station.availability === "available"
                  ? "bg-green-500/20 text-green-400"
                  : station.availability === "limited"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}>
                {getAvailabilityText(station.availability)}
              </div>
            </div>
          </div>

          {/* Station Info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <div className="flex-1">
                <h1 className="font-display text-3xl sm:text-4xl font-light text-white mb-2">
                  {station.name}
                </h1>
                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                  <MapPin size={18} />
                  <p className="text-sm">{station.address}, {station.city}, {station.state} {station.zipCode}</p>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{station.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href={`/navigate/${station.id}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  <Navigation size={18} />
                  Navigate
                </Link>
                <button
                  onClick={handleBookNow}
                  className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  <Calendar size={18} />
                  Book Now
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <MapPin size={18} />
                  <span className="text-xs uppercase tracking-wider">Distance</span>
                </div>
                <p className="text-white text-xl font-semibold">{station.distance.toFixed(1)} km</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Zap size={18} />
                  <span className="text-xs uppercase tracking-wider">Price</span>
                </div>
                <p className="text-white text-xl font-semibold">${station.pricePerKwh}/kWh</p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs uppercase tracking-wider">Rating</span>
                </div>
                <p className="text-white text-xl font-semibold">{station.rating} <span className="text-sm text-zinc-400">({station.totalRatings})</span></p>
              </div>
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <Clock size={18} />
                  <span className="text-xs uppercase tracking-wider">Hours</span>
                </div>
                <p className="text-white text-xl font-semibold">{station.workingHours.open} - {station.workingHours.close}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charger Types */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Charger Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {station.chargerTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-3 bg-zinc-800/50 rounded-xl p-4"
                  >
                    <Zap className="text-zinc-400" size={20} />
                    <span className="text-white font-medium">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {station.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-zinc-300">
                    <Check size={18} className="text-green-400" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Working Hours</h2>
              <div className="flex items-center gap-3">
                <Clock className="text-zinc-400" size={24} />
                <div>
                  <p className="text-white font-medium">{station.workingHours.open} - {station.workingHours.close}</p>
                  <p className="text-zinc-400 text-sm">
                    {station.workingHours.isOpen ? "Currently Open" : "Currently Closed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href={`/navigate/${station.id}`}
                  className="flex items-center gap-3 w-full bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                >
                  <Navigation className="text-zinc-400" size={20} />
                  <span className="text-white">Get Directions</span>
                </Link>
                <button
                  onClick={handleBookNow}
                  className="flex items-center gap-3 w-full bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                >
                  <Calendar className="text-zinc-400" size={20} />
                  <span className="text-white">Book a Slot</span>
                </button>
                <a
                  href={`tel:+1234567890`}
                  className="flex items-center gap-3 w-full bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                >
                  <Phone className="text-zinc-400" size={20} />
                  <span className="text-white">Call Station</span>
                </a>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="text-zinc-400 mt-1" size={18} />
                  <div>
                    <p className="text-white text-sm">{station.address}</p>
                    <p className="text-zinc-400 text-sm">{station.city}, {station.state} {station.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
