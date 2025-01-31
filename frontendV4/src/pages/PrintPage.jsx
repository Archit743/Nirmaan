import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../components/Header";
import React, { useState, useCallback } from "react";

// Mock upload function
const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const upload = async ({ file }) => {
    setLoading(true);
    try {
      // Simulate file upload with mock URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUrl = URL.createObjectURL(file);
      return { url: mockUrl, mimeType: file.type };
    } catch (error) {
      return { error: "Upload failed" };
    } finally {
      setLoading(false);
    }
  };

  return [upload, { loading }];
};

// Mock API call
const createPrintOrder = async (orderDetails) => {
  console.log("Submitting order:", orderDetails);
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

function PrintPage() {
  const [orderDetails, setOrderDetails] = useState({
    documentType: "",
    copies: 1,
    colorType: "bw",
    orientation: "portrait",
    totalCost: 0,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [upload, { loading: uploadLoading }] = useUpload();
  const [fileType, setFileType] = useState("");
  const prices = { bw: 0.1, color: 0.25 };

  const calculateTotal = useCallback(() => {
    const basePrice = prices[orderDetails.colorType];
    return (basePrice * orderDetails.copies).toFixed(2);
  }, [orderDetails.colorType, orderDetails.copies]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { url, error, mimeType } = await upload({ file });
    if (error) {
      alert("Failed to upload file. Please try again.");
      return;
    }

    setPreviewUrl(url);
    const type = mimeType.split("/")[1].toUpperCase();
    setFileType(type);
    setOrderDetails(prev => ({ ...prev, documentType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = calculateTotal();

    if (!previewUrl) {
      alert("Please upload a document first.");
      return;
    }

    try {
      await createPrintOrder({
        ...orderDetails,
        documentUrl: previewUrl,
        totalCost: parseFloat(total),
        status: "pending",
      });

      setOrderDetails({
        documentType: "",
        copies: 1,
        colorType: "bw",
        orientation: "portrait",
        totalCost: 0,
      });
      setPreviewUrl(null);
      setFileType("");
      alert("Print order submitted successfully!");
    } catch (error) {
      alert("Failed to submit print order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-roboto text-black">
          Printing Service
        </h1>

        <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (keep the rest of your JSX structure unchanged) ... */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PrintPage;