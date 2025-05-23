
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Venue", path: "/book" },
    { name: "Team Hub", path: "/teams" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      }`}
      style={{
        transform: isScrolled ? 'perspective(1000px) translateZ(0)' : 'perspective(1000px) translateZ(10px)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-sport-purple font-montserrat font-bold text-2xl md:text-3xl transform transition-transform hover:scale-105"
                style={{
                  textShadow: '0px 2px 4px rgba(128, 90, 213, 0.3)',
                  transform: 'perspective(1000px) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}
            >
              Sports
              <span className="text-purple-900">Spot</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-purple-900 bg-purple-100"
                    : "text-gray-600 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth buttons or user menu */}
            {user ? (
              <div className="flex items-center ml-4 space-x-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="font-medium border-2 border-red-500 text-red-500 hover:bg-red-50">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="outline" className="font-medium border-2 border-sport-purple text-sport-purple hover:bg-purple-50">
                    My Profile
                  </Button>
                </Link>
                <Button 
                  onClick={() => signOut()}
                  variant="ghost" 
                  className="font-medium text-gray-600 hover:text-purple-900"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center ml-4 space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="font-medium border-2 border-sport-purple text-sport-purple hover:bg-purple-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-medium bg-sport-purple hover:bg-sport-purple-dark text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-sport-purple focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg absolute w-full`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? "text-purple-900 bg-purple-100"
                  : "text-gray-600 hover:text-purple-900 hover:bg-purple-50"
              }`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-4 py-3 rounded-md text-red-500 hover:bg-purple-50 font-medium"
                  onClick={closeMenu}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/profile"
                className="block px-4 py-3 rounded-md text-sport-purple hover:bg-purple-50 font-medium"
                onClick={closeMenu}
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="block w-full text-left px-4 py-3 rounded-md text-gray-600 hover:text-purple-900 hover:bg-purple-50 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 rounded-md text-sport-purple hover:bg-purple-50 font-medium"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-3 rounded-md text-white bg-sport-purple hover:bg-sport-purple-dark font-medium"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
