import { Link } from 'react-router-dom';
import { Stethoscope, Phone, Mail, MapPin, Globe, Rss, Share2, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Book Appointment', path: '/book' },
  { name: 'Contact', path: '/contact' },
];

const services = [
  'General Consultation',
  'Pediatrics',
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Dental Care',
  'Neurology',
  'Gynecology',
];

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <Stethoscope size={20} className="text-primary" />
              </div>
              <div>
                <span className="font-headline font-bold text-lg leading-tight block">SmartCare</span>
                <span className="text-xs text-primary-200 leading-tight block">Clinic</span>
              </div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-5">
              Providing quality healthcare services with compassion and expertise. Your health is our top priority.
            </p>
            <div className="flex gap-3">
              {[Share2, Rss, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline font-bold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-200 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline font-bold text-base mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-secondary-400 rounded-full"></span>
                  <span className="text-primary-200 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-headline font-bold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+911234567890" className="flex items-start gap-2.5 text-primary-200 text-sm hover:text-white transition-colors duration-200">
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span>+91 12345 67890</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@smartcare.clinic" className="flex items-start gap-2.5 text-primary-200 text-sm hover:text-white transition-colors duration-200">
                  <Mail size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span>info@smartcare.clinic</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-primary-200 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>123 Health Street, Medical Colony, City - 400001</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-primary-200 font-medium">🕒 Mon–Fri: 9AM–7PM</p>
              <p className="text-xs text-primary-200">Sat: 9AM–2PM | Sun: Emergency</p>
            </div>
          </div>
        </div>

        {/* Large Watermark Text */}
        <div className="w-screen relative left-[50%] -ml-[50vw] flex justify-center items-end pointer-events-none select-none mt-10 mb-4 opacity-5 overflow-hidden">
          <span className="font-headline font-black text-[15.5vw] leading-none tracking-tighter whitespace-nowrap">
            SMARTCARE
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-primary-300 text-sm">
            © {new Date().getFullYear()} SmartCare Clinic. All rights reserved.
          </p>
          <p className="text-primary-300 text-sm flex items-center gap-1">
            Made with <Heart size={13} className="text-red-400 fill-red-400" /> for better healthcare
          </p>
          <Link to="/admin/login" className="text-primary-300 text-xs hover:text-primary-200 transition-colors duration-200">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
