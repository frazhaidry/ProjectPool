import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut, Home, FolderOpen, Settings } from "lucide-react";

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Reusable button styles
  // const primaryBtn =
  //   "px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-500 transition shadow";
  // const secondaryBtn =
  //   "px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition";

  return (
  <nav className="bg-blue-100 shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FolderOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            ProjectPool
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-950 font-extrabold">
          <NavItem to="/" icon={<Home className="h-4 w-4" />} label="Home" />
          <NavItem to="/projects" icon={<FolderOpen className="h-4 w-4" />} label="Projects" />

          {isAuthenticated && (
            <NavItem
              to="/my-submissions"
              icon={<User className="h-4 w-4" />}
              label="My Submissions"
            />
          )}

          {isAdmin && (
            <NavItem
              to="/admin"
              icon={<Settings className="h-4 w-4" />}
              label="Admin"
            />
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-2">
                <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="hidden md:block leading-tight">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:border-blue-500 hover:text-blue-600 transition"
                 >
                Login
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </nav>
);

};

export default Navbar;

