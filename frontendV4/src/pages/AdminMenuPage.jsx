"use client";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Import your API functions
import { createMenuItem, listMenuItems, deleteMenuItem } from "../api/menuApi"; 
// Import useUpload if it exists
import { useUpload } from "../hooks/useUpload"; 


function AdminMenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [upload, { loading: uploadLoading }] = useUpload();
  
    const [newItem, setNewItem] = useState({
      name: "",
      description: "",
      price: "",
      image: "",
    });
  
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleImageUpload = async (file) => {
      const { url, error } = await upload({ file });
      if (error) {
        setError(error);
        return null;
      }
      return url;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      let imageUrl = newItem.image;
      if (selectedFile) {
        imageUrl = await handleImageUpload(selectedFile);
        if (!imageUrl) return;
      }
  
      const menuItem = {
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        image: imageUrl,
      };
  
      try {
        await createMenuItem(menuItem);
        setNewItem({ name: "", description: "", price: "", image: "" });
        setSelectedFile(null);
        fetchMenuItems();
      } catch (err) {
        setError(err.message);
      }
    };
  
    const fetchMenuItems = async () => {
      try {
        const items = await listMenuItems();
        setMenuItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await deleteMenuItem(id);
        fetchMenuItems();
      } catch (err) {
        setError(err.message);
      }
    };
  
    useEffect(() => {
      fetchMenuItems();
    }, []);
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl font-roboto">Loading...</div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 font-roboto">Menu Management</h1>
  
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 font-roboto">
              Add New Menu Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  className="border p-2 rounded"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  placeholder="Price"
                  className="border p-2 rounded"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="border p-2 rounded"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="border p-2 rounded"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                disabled={uploadLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {uploadLoading ? "Uploading..." : "Add Item"}
              </button>
            </form>
          </div>
  
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={`Menu item ${item.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 font-roboto">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  
  export default AdminMenuPage;