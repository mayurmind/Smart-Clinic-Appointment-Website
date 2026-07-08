import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingAIChat from './components/FloatingAIChat.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import BookAppointment from './pages/BookAppointment.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book" element={<BookAppointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingAIChat />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
        <Toaster
          position="top-right"
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
            success: {
              iconTheme: { primary: '#2E7D32', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#dc2626', secondary: '#fff' },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}
