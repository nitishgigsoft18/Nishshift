"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Navigation, Search, Filter, ArrowLeft, Star, Clock, Zap } from "lucide-react";
import { mockStations, getNearbyStations } from "@/lib/data";
import { ChargingStation, ChargerType } from "@/lib/types";
import Banner from "../components/banner";

export default function StationsPage() {
  const [stations, setStations] = useState<ChargingStation[]>(mockStations);
  const [filteredStations, setFilteredStations] = useState<ChargingStation[]>(mockStations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChargerType, setSelectedChargerType] = useState<ChargerType | "all">("all");
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    let filtered = stations;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by charger type
    if (selectedChargerType !== "all") {
      filtered = filtered.filter((station) =>
        station.chargerTypes.includes(selectedChargerType)
      );
    }

    // Sort stations
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance;
        case "price":
          return a.pricePerKwh - b.pricePerKwh;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredStations(filtered);
  }, [searchQuery, selectedChargerType, sortBy, stations]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          const nearbyStations = getNearbyStations(location.lat, location.lng, 50);
          setStations(nearbyStations);
        },
        (error) => {
          // console.error("Error getting location:", error);
        }
      );
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
    <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-8">
      {/* <div className="min-h-[400px] flex items-center justify-center station-banner relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-semibold text-white">Stations</h1>
        </div>
      </div> */}
      <Banner title="Stations" backgroundImage="/public/assets/images/Station-banner.jpg" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back to Home</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-2">Network</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-white">
                Charging Stations
              </h1>
            </div>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors font-medium text-sm uppercase tracking-wider"
            >
              <MapPin size={18} />
              View Map
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search stations by name, address, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Charger Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <select
                value={selectedChargerType}
                onChange={(e) => setSelectedChargerType(e.target.value as ChargerType | "all")}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Charger Types</option>
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="DC Fast">DC Fast</option>
                <option value="Tesla Supercharger">Tesla Supercharger</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "distance" | "price" | "rating")}
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
            >
              <option value="distance">Sort by Distance</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-zinc-400 text-sm">
            {filteredStations.length} station{filteredStations.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all group"
            >
              {/* Station Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="text-zinc-700 w-16 h-16" />
                </div>
                <div className="absolute top-3 right-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
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
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-zinc-300 transition-colors">
                  {station.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-3 line-clamp-1">{station.address}</p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Distance</p>
                    <p className="text-white font-medium text-sm">{station.distance.toFixed(1)} km</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Price</p>
                    <p className="text-white font-medium text-sm">${station.pricePerKwh}/kWh</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-medium text-sm">{station.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Charger Types */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {station.chargerTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
                    >
                      {type}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/stations/${station.id}`}
                    className="flex-1 bg-white text-black py-2.5 rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors text-center"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/navigate/${station.id}`}
                    className="flex-1 border border-white text-white py-2.5 rounded-lg font-medium text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Navigation size={16} />
                    Navigate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="text-zinc-700 w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No stations found</h3>
            <p className="text-zinc-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
