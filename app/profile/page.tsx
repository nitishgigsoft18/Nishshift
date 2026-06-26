"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Car, Calendar, MapPin, Settings, LogOut, CreditCard, Bell, Shield, Edit } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"bookings" | "vehicles" | "settings">("bookings");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    avatar: null,
  };

  // Mock bookings
  const bookings = [
    {
      id: "BK001",
      stationName: "NISHSHIFT Central Hub",
      date: "2024-06-27",
      time: "14:00",
      duration: 45,
      status: "confirmed",
      price: 13.12,
    },
    {
      id: "BK002",
      stationName: "Times Square Power Station",
      date: "2024-06-20",
      time: "10:00",
      duration: 30,
      status: "completed",
      price: 8.40,
    },
    {
      id: "BK003",
      stationName: "Queens Mall Supercharger",
      date: "2024-06-15",
      time: "16:00",
      duration: 60,
      status: "completed",
      price: 22.80,
    },
  ];

  // Mock vehicles
  const vehicles = [
    {
      id: "V001",
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      chargerType: "Tesla Supercharger",
      plate: "ABC-1234",
    },
    {
      id: "V002",
      make: "BMW",
      model: "i4",
      year: 2024,
      chargerType: "DC Fast",
      plate: "XYZ-5678",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "completed":
        return "bg-zinc-500/20 text-zinc-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back to Home</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center">
                  <User className="text-zinc-400" size={32} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                  <p className="text-zinc-400 text-sm">{user.email}</p>
                </div>
                <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <Edit size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-zinc-300">
                  <User size={18} className="text-zinc-500" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin size={18} className="text-zinc-500" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800">
                <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Total Bookings</span>
                  <span className="text-white font-medium">{bookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Vehicles</span>
                  <span className="text-white font-medium">{vehicles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Total Spent</span>
                  <span className="text-white font-medium">$44.32</span>
                </div>
              </div>
            </div>

            {/* Settings Links */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
              <div className="space-y-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800/50 transition-colors text-left">
                  <Settings className="text-zinc-400" size={20} />
                  <span className="text-white">Account Settings</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800/50 transition-colors text-left">
                  <CreditCard className="text-zinc-400" size={20} />
                  <span className="text-white">Payment Methods</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800/50 transition-colors text-left">
                  <Bell className="text-zinc-400" size={20} />
                  <span className="text-white">Notifications</span>
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800/50 transition-colors text-left">
                  <Shield className="text-zinc-400" size={20} />
                  <span className="text-white">Privacy & Security</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-zinc-800">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`flex-1 py-4 px-6 text-sm font-medium uppercase tracking-wider transition-colors ${
                    activeTab === "bookings"
                      ? "text-white border-b-2 border-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    Bookings
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("vehicles")}
                  className={`flex-1 py-4 px-6 text-sm font-medium uppercase tracking-wider transition-colors ${
                    activeTab === "vehicles"
                      ? "text-white border-b-2 border-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Car size={18} />
                    Vehicles
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex-1 py-4 px-6 text-sm font-medium uppercase tracking-wider transition-colors ${
                    activeTab === "settings"
                      ? "text-white border-b-2 border-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Settings size={18} />
                    Settings
                  </div>
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "bookings" && (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-medium mb-1">{booking.stationName}</h4>
                            <p className="text-zinc-400 text-sm">
                              {booking.date} at {booking.time} ({booking.duration} min)
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400 text-sm">Booking ID: {booking.id}</span>
                          <span className="text-white font-medium">${booking.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    {bookings.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="text-zinc-700 w-12 h-12 mx-auto mb-4" />
                        <p className="text-zinc-400">No bookings yet</p>
                        <Link
                          href="/stations"
                          className="inline-block mt-4 text-white hover:underline"
                        >
                          Find a station
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "vehicles" && (
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                              <Car className="text-zinc-400" size={24} />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </h4>
                              <p className="text-zinc-400 text-sm">{vehicle.plate}</p>
                            </div>
                          </div>
                          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                            <Edit size={18} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded">
                            {vehicle.chargerType}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full border border-dashed border-zinc-700 rounded-xl p-4 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors flex items-center justify-center gap-2">
                      <Car size={20} />
                      <span>Add Vehicle</span>
                    </button>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-medium mb-4">Account Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                          <span className="text-zinc-300 text-sm">Email Notifications</span>
                          <button className="w-12 h-6 bg-white rounded-full relative">
                            <span className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                          <span className="text-zinc-300 text-sm">SMS Notifications</span>
                          <button className="w-12 h-6 bg-zinc-700 rounded-full relative">
                            <span className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                          <span className="text-zinc-300 text-sm">Location Services</span>
                          <button className="w-12 h-6 bg-white rounded-full relative">
                            <span className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-4">Payment</h4>
                      <button className="w-full p-4 bg-zinc-800/50 rounded-lg text-left hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <CreditCard className="text-zinc-400" size={20} />
                          <div>
                            <p className="text-white text-sm">Manage Payment Methods</p>
                            <p className="text-zinc-500 text-xs">Add or remove cards</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-4">Danger Zone</h4>
                      <button className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left hover:bg-red-500/20 transition-colors">
                        <p className="text-red-400 text-sm">Delete Account</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
