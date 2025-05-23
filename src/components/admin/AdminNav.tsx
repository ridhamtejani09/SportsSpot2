
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Users, Calendar, LayoutGrid, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const AdminNav = () => {
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
  
  return (
    <nav className="bg-white border-r border-gray-200 w-64 h-full shadow-md flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">Manage your platform</p>
        </div>
        
        <div className="flex-grow p-4">
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
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              View Site
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
            onClick={() => signOut()}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
