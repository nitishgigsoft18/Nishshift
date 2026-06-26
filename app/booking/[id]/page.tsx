"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Zap, Check, CreditCard, Car } from "lucide-react";
import { getStationById } from "@/lib/data";
import { ChargingStation } from "@/lib/types";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const station = getStationById(params.id as string) as ChargingStation;
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedCharger, setSelectedCharger] = useState(station?.chargerTypes[0] || "");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const handleBooking = () => {
    setBookingConfirmed(true);
  };

  const calculatePrice = () => {
    // Estimate: average EV charges at 50kW for DC Fast, 7kW for Level 2
    const power = selectedCharger.includes("DC Fast") || selectedCharger.includes("Supercharger") ? 50 : 7;
    const kwh = (power * selectedDuration) / 60;
    return (kwh * station.pricePerKwh).toFixed(2);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00"
  ];

  const durations = [15, 30, 45, 60, 90, 120];

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-8 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-400" size={40} />
            </div>
            <h1 className="font-display text-3xl font-light text-white mb-2">Booking Confirmed!</h1>
            <p className="text-zinc-400 mb-6">Your charging slot has been reserved</p>
            
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 text-left">
              <p className="text-white font-medium mb-1">{station.name}</p>
              <p className="text-zinc-400 text-sm mb-3">{station.address}</p>
              <div className="flex items-center gap-2 text-zinc-300 text-sm">
                <Calendar size={16} />
                <span>{selectedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300 text-sm mt-1">
                <Clock size={16} />
                <span>{selectedTime} ({selectedDuration} min)</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/profile"
                className="block w-full bg-white text-black py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-zinc-200 transition-colors text-center"
              >
                View My Bookings
              </Link>
              <Link
                href="/"
                className="block w-full border border-white text-white py-3 rounded-lg font-medium uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <h1 className="font-display text-3xl sm:text-4xl font-light text-white mb-2">
                Book Charging Slot
              </h1>
              <p className="text-zinc-400 mb-8">Reserve your charging time at {station.name}</p>

              <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-6">
                {/* Station Info */}
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Zap className="text-zinc-400" size={24} />
                    <div>
                      <p className="text-white font-medium">{station.name}</p>
                      <p className="text-zinc-400 text-sm">{station.address}</p>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    min={getTodayDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? "bg-white text-black"
                            : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Duration
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {durations.map((duration) => (
                      <button
                        key={duration}
                        type="button"
                        onClick={() => setSelectedDuration(duration)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedDuration === duration
                            ? "bg-white text-black"
                            : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {duration}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Charger Type Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Charger Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {station.chargerTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedCharger(type)}
                        className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                          selectedCharger === type
                            ? "bg-white text-black"
                            : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        <Zap size={20} />
                        <span className="font-medium">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-zinc-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400">Estimated Cost</span>
                    <span className="text-white font-medium">${calculatePrice()}</span>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    Based on ${station.pricePerKwh}/kWh and {selectedDuration}min charging time
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-white text-black py-4 rounded-lg font-medium uppercase tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Station Quick Info */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Station Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Price</p>
                  <p className="text-white font-medium">${station.pricePerKwh}/kWh</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Rating</p>
                  <p className="text-white font-medium">⭐ {station.rating}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-white font-medium">{station.workingHours.open} - {station.workingHours.close}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Availability</p>
                  <p className={`font-medium ${
                    station.availability === "available" ? "text-green-400" : 
                    station.availability === "limited" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {station.availability === "available" ? "Available" : 
                     station.availability === "limited" ? "Limited" : "Full"}
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {station.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Need Help?</h2>
              <p className="text-zinc-400 text-sm mb-4">
                Having trouble with your booking? Contact our support team.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
