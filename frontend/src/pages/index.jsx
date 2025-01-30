import { Car, Zap, Printer, Coffee } from "lucide-react";
import Layout from "../components/layout";
import ServiceCard from "../components/ServiceCard";

const Index = () => {
  const services = [
    {
      title: "Parking Allocation",
      description: "Book parking spots and manage your vehicle parking with QR codes.",
      icon: Car,
      link: "/parking",
    },
    {
      title: "EV Charging",
      description: "Reserve EV charging stations and manage your charging sessions.",
      icon: Zap,
      link: "/ev-charging",
    },
    {
      title: "Printing Service",
      description: "Upload and print documents with ease.",
      icon: Printer,
      link: "/printing",
    },
    {
      title: "Canteen Orders",
      description: "Order food from the campus canteen with customizable meals.",
      icon: Coffee,
      link: "/canteen",
    },
  ];

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Campus Services</h1>
        <p className="text-lg text-gray-600">All your campus needs in one place</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;