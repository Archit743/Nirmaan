import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../components/Header";

function PrintPage() {
        const { useState, useCallback } = React;
        const [orderDetails, setOrderDetails] = useState({
          documentType: "",
          copies: 1,
          colorType: "bw",
          orientation: "portrait",
          totalCost: 0,
        });
        const [previewUrl, setPreviewUrl] = useState(null);
        const [uploadLoading, setUploadLoading] = useState(false);
        const [fileType, setFileType] = useState("");
        const prices = {
          bw: 0.1,
          color: 0.25,
        };
        const calculateTotal = useCallback(() => {
          const basePrice = prices[orderDetails.colorType];
          return (basePrice * orderDetails.copies).toFixed(2);
        }, [orderDetails.colorType, orderDetails.copies]);
        const handleFileChange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            setUploadLoading(true);
            try {
              const { url, error, mimeType } = await useUpload({ file });
              if (error) {
                alert("Failed to upload file. Please try again.");
                return;
              }
              setPreviewUrl(url);
              const type = mimeType.split("/")[1].toUpperCase();
              setFileType(type);
              setOrderDetails({
                ...orderDetails,
                documentType: type,
              });
            } finally {
              setUploadLoading(false);
            }
          }
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
            <Header/>
            <div className="container mx-auto px-4 py-12">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-roboto text-black">
                Printing Service
              </h1>
      
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-roboto mb-2">
                          Document Type
                        </label>
                        <input
                          type="text"
                          name="documentType"
                          required
                          disabled
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                          value={fileType || "No file selected"}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-roboto mb-2">
                          Number of Copies
                        </label>
                        <input
                          type="number"
                          name="copies"
                          min="1"
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          value={orderDetails.copies}
                          onChange={(e) =>
                            setOrderDetails({
                              ...orderDetails,
                              copies: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-roboto mb-2">
                          Print Type
                        </label>
                        <select
                          name="colorType"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          value={orderDetails.colorType}
                          onChange={(e) =>
                            setOrderDetails({
                              ...orderDetails,
                              colorType: e.target.value,
                            })
                          }
                        >
                          <option value="bw">Black & White ($0.10/page)</option>
                          <option value="color">Color ($0.25/page)</option>
                        </select>
                      </div>
      
                      <div>
                        <label className="block text-gray-700 font-roboto mb-2">
                          Page Orientation
                        </label>
                        <select
                          name="orientation"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2"
                          value={orderDetails.orientation}
                          onChange={(e) =>
                            setOrderDetails({
                              ...orderDetails,
                              orientation: e.target.value,
                            })
                          }
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="text-xl font-roboto font-bold">
                          Total Cost: ${calculateTotal()}
                        </div>
                      </div>
                    </div>
      
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <label className="block text-gray-700 font-roboto mb-2">
                        Upload Document
                      </label>
                      <input
                        type="file"
                        name="document"
                        accept="application/pdf,image/*,.doc,.docx"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
                        onChange={handleFileChange}
                      />
                      {previewUrl && (
                        <div className="mt-4">
                          <label className="block text-gray-700 font-roboto mb-2">
                            Preview
                          </label>
                          <div className="border rounded-lg p-2 bg-white">
                            {fileType.includes("PDF") || fileType.includes("DOC") ? (
                              <iframe
                                src={previewUrl}
                                className="w-full h-[400px]"
                                title="Document preview"
                              />
                            ) : (
                              <img
                                src={previewUrl}
                                alt="Document preview"
                                className="w-full h-[400px] object-contain"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
      
                  <button
                    type="submit"
                    className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 font-roboto mt-6"
                    disabled={uploadLoading}
                  >
                    {uploadLoading ? "Uploading..." : "Submit Order"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      }
      
      
      

export default PrintPage;
