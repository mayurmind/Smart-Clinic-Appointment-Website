import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Stethoscope } from "lucide-react";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Book Appointment", path: "/book" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-button group-hover:scale-110 transition-all duration-200 ${
              isScrolled ? "bg-primary" : "bg-white"
            }`}>
              <Stethoscope size={20} className={isScrolled ? "text-white" : "text-primary"} />
            </div>
            <div>
              <span className={`font-headline font-bold text-lg leading-tight block transition-colors duration-200 ${
                isScrolled ? "text-primary" : "text-white"
              }`}>SmartCare</span>
              <span className={`text-xs leading-tight block transition-colors duration-200 ${
                isScrolled ? "text-textSecondary" : "text-blue-100"
              }`}>Clinic</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-white shadow-button"
                    : isScrolled
                    ? "text-textPrimary hover:bg-primary-50 hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:108" className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isScrolled ? "text-textSecondary hover:text-primary" : "text-white/80 hover:text-white"}`}>
              <Phone size={16} />
              <span> 108 </span>
            </a>
            <button onClick={() => navigate("/book")} className="hidden md:block btn-secondary text-sm py-2 px-5">Book Now</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isScrolled ? "text-textPrimary hover:bg-gray-100" : "text-white hover:bg-white/10"}`} aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(link.path) ? "bg-primary text-white" : "text-textPrimary hover:bg-primary-50 hover:text-primary"}`}>
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t border-gray-100">
                <a href="tel:108" className="flex items-center gap-2 px-4 py-3 text-sm text-textSecondary">
                  <Phone size={16} /><span>108</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
