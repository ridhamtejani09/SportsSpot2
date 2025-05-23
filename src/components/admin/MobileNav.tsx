
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, Users, Calendar, LayoutGrid, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <LayoutGrid size={18} />,
      href: "/admin",
    },
    {
      label: "Venues",
      icon: <Briefcase size={18} />,
      href: "/admin/venues",
    },
    {
      label: "Bookings",
      icon: <Calendar size={18} />,
      href: "/admin/bookings",
    },
    {
      label: "Users",
      icon: <Users size={18} />,
      href: "/admin/users",
    },
    {
      label: "Settings",
      icon: <Settings size={18} />,
      href: "/admin/settings",
    },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute inset-x-0 top-16 z-50 bg-white shadow-lg">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      isActive(item.href)
                        ? "bg-sport-purple text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 space-y-2">
              <Link to="/" onClick={closeMenu}>
                <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  View Site
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
