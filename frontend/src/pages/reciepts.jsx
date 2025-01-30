import { useState } from "react";
import Layout from "../components/layout";
import Receipt from "../components/receipt";

const ReceiptsPage = () => {
  const [receipts] = useState([
    {
      id: "1",
      type: "parking",
      confirmationCode: "PRK001",
      date: "2024-02-20",
      amount: 50,
      status: "completed",
      details: {
        "Parking Section": "Parking 1 (Backside of D Building)",
        "Spot Number": "20",
        "Duration": "2 hours"
      }
    },
    {
      id: "2",
      type: "ev-charging",
      confirmationCode: "EVC001",
      date: "2024-02-19",
      amount: 100,
      status: "completed",
      details: {
        "Vehicle Model": "Ola S1 Pro",
        "Initial Charge": "20%",
        "Final Charge": "80%",
        "Duration": "2.5 hours"
      }
    },
    {
      id: "3",
      type: "printing",
      confirmationCode: "PRT001",
      date: "2024-02-18",
      amount: 25,
      status: "pending",
      details: {
        "Document Type": "PDF",
        "Pages": "5",
        "Copies": "2",
        "Color": "Black & White"
      }
    },
    {
      id: "4",
      type: "canteen",
      confirmationCode: "CNT001",
      date: "2024-02-17",
      amount: 150,
      status: "completed",
      details: {
        "Order Items": "Customized Bowl",
        "Add-ons": "Paneer, Tofu",
        "Scheduled Time": "12:30 PM"
      }
    }
  ]);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Your Receipts</h1>
        <div className="space-y-6">
          {['parking', 'ev-charging', 'printing', 'canteen'].map((type) => (
            <section key={type}>
              <h2 className="text-xl font-semibold mb-4">{type.replace('-', ' ').toUpperCase()} Receipts</h2>
              <div className="space-y-4">
                {receipts.filter(receipt => receipt.type === type).map(receipt => (
                  <Receipt key={receipt.id} receipt={receipt} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptsPage;
