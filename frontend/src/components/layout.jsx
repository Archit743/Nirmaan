import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">CampusHub</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <Link to="/receipts" className="text-gray-600 hover:text-gray-900">
                Your Receipts
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
