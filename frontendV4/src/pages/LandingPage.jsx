"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function LandingPage() {
  const navigate = useNavigate(); // React Router hook for navigation

  const services = [
    { title: "Canteen Service", icon: "fa-utensils", description: "Order food and beverages from our campus canteen", path: "/canteen" },
    { title: "Printing Service", icon: "fa-print", description: "Print your documents quickly and efficiently", path: "/printing" },
    { title: "Parking Service", icon: "fa-car", description: "Reserve and manage your parking space seamlessly", path: "/parking" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
          Campus Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => navigate(service.path)} // Redirect on click
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                  <i className={`fas ${service.icon} text-2xl text-white`}></i>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-black">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent div click event from firing
                    navigate(service.path);
                  }}
                  className="mt-6 bg-black text-white px-4 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 text-lg tracking-wide w-auto inline-block"
                >
                  Access Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
