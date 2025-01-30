"use client";
import React from "react";
import { useState,useEffect } from "react";

function CanteenPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    fetchMenuItems();
    fetchCart();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/get-cart", {
        method: "POST",
        body: JSON.stringify({ userId: "user456" }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCartItems(data.items || []);
      }
    } catch (err) {
      setError("Failed to fetch cart");
    }
  };
  const handleAddToCart = async (item) => {
    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        body: JSON.stringify({
          menuItemId: item.id,
          quantity: 1,
          userId: "user456",
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccessMessage("Added to cart!");
        fetchCart();
      }
    } catch (err) {
      setError("Failed to add to cart");
    }
  };
  const fetchMenuItems = async () => {
    try {
      const dummyItems = [
        {
          id: 1,
          name: "Classic Breakfast",
          description: "Eggs, bacon, toast, and hash browns",
          price: 12.99,
          category: "breakfast",
          image: "/images/breakfast.jpg",
        },
        {
          id: 2,
          name: "Chicken Caesar Salad",
          description: "Fresh romaine lettuce with grilled chicken",
          price: 10.99,
          category: "lunch",
          image: "/images/salad.jpg",
        },
        {
          id: 3,
          name: "Spaghetti Bolognese",
          description: "Pasta with rich meat sauce",
          price: 14.99,
          category: "dinner",
          image: "/images/pasta.jpg",
        },
        {
          id: 4,
          name: "Fresh Fruit Smoothie",
          description: "Blend of seasonal fruits",
          price: 5.99,
          category: "beverages",
          image: "/images/smoothie.jpg",
        },
        {
          id: 5,
          name: "Chocolate Chip Cookies",
          description: "Freshly baked cookies",
          price: 3.99,
          category: "snacks",
          image: "/images/cookies.jpg",
        },
        {
          id: 6,
          name: "Grilled Salmon",
          description: "Served with seasonal vegetables",
          price: 18.99,
          category: "dinner",
          image: "/images/salmon.jpg",
        },
      ];
      setMenuItems(dummyItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePayment = async () => {
    setPaymentLoading(true);
    setError(null);
    try {
      const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
      const response = await fetch("/api/process-payment", {
        method: "POST",
        body: JSON.stringify({
          userId: "user456",
          amount: total,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccessMessage("Payment successful!");
        setCartItems([]);
        setIsCartOpen(false);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-roboto">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Increased mt-16 to mt-24 for more space at top */}
      <div className="container mx-auto px-4 py-12 mt-40">
        {successMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-out">
            {successMessage}
          </div>
        )}

        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300 w-auto inline grid"
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Increased mb-16 to mb-20 for more spacing */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-20 font-roboto text-black pt-8">
          Canteen Menu
        </h1>
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search menu items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={`${item.name} dish`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg font-roboto">{item.name}</h3>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-roboto">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 font-roboto w-auto inline-grid"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8 font-roboto">
            No menu items found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default CanteenPage;