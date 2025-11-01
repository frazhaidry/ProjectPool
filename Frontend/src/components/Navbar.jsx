import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { User, LogOut, Home, FolderOpen, Settings, FileText, Users, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

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
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { to: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
      { to: "/projects", icon: <FolderOpen className="h-4 w-4" />, label: "Projects" },
    ];

    if (!isAuthenticated) {
      return baseItems;
    }

    if (isAdmin) {
      return [
        ...baseItems,
        { to: "/admin", icon: <Settings className="h-4 w-4" />, label: "Admin Dashboard" },
        { to: "/admin", icon: <Users className="h-4 w-4" />, label: "Manage Submissions" },
      ];
    }

    return [
      ...baseItems,
      { to: "/my-submissions", icon: <FileText className="h-4 w-4" />, label: "My Submissions" },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-blue-100 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FolderOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 tracking-tight">ProjectPool</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-gray-950 font-extrabold">
            {navItems.map((item, index) => (
              <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ring-2 ring-blue-200">
                    {isAdmin ? (
                      <Shield className="h-4 w-4 text-blue-700" />
                    ) : (
                      <User className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="hidden md:block leading-tight">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          isAdmin
                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                            : user?.role === "faculty"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-blue-100 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {isAdmin
                        ? "System Administrator"
                        : user?.role === "faculty"
                        ? "Faculty Member"
                        : "Student"}
                    </p>
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

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ring-2 ring-blue-200">
                      {isAdmin ? (
                        <Shield className="h-3 w-3 text-blue-700" />
                      ) : (
                        <User className="h-3 w-3 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            isAdmin
                              ? "bg-purple-100 text-purple-700"
                              : user?.role === "faculty"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {isAdmin
                          ? "System Administrator"
                          : user?.role === "faculty"
                          ? "Faculty Member"
                          : "Student"}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
