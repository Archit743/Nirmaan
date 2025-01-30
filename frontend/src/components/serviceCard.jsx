import { Link } from "react-router-dom";

const ServiceCard = ({ title, description, icon: Icon, link }) => {
  return (
    <Link to={link}>
      <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-primary mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
