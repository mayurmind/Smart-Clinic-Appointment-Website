import { motion } from 'framer-motion';
import AppointmentForm from '../components/AppointmentForm';
import { CalendarCheck, Clock, Shield, Phone } from 'lucide-react';

const infoCards = [
  { icon: Clock, title: 'Quick Booking', desc: 'Fill in your details in under 2 minutes.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data is fully encrypted and confidential.' },
  { icon: CalendarCheck, title: '24h Confirmation', desc: 'We confirm your slot within 24 hours.' },
  { icon: Phone, title: 'Need Help?', desc: 'Call 108 for assistance.' },
];

export default function BookAppointment() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-hero-gradient pt-32 pb-20 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-white/15 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            📅 Easy Booking
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mb-4">Book Your Appointment</h1>
          <p className="text-blue-100 text-lg max-w-lg mx-auto">
            Fill in your details below and we'll confirm your appointment within 24 hours.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card p-8">
              <h2 className="font-headline font-bold text-2xl text-textPrimary mb-6 flex items-center gap-2">
                <CalendarCheck size={22} className="text-primary" />
                Appointment Details
              </h2>
              <AppointmentForm />
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Info Cards */}
            {infoCards.map((card, i) => (
              <div key={card.title} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <card.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-textPrimary text-sm">{card.title}</h3>
                  <p className="text-textSecondary text-xs mt-0.5">{card.desc}</p>
                </div>
              </div>
            ))}

            {/* Doctor card */}
            <div className="card p-6 bg-primary-800 text-white">
              <div className="text-4xl mb-3 text-center">👨‍⚕️</div>
              <h3 className="font-headline font-bold text-center mb-1">Dr. Arjun Sharma</h3>
              <p className="text-blue-200 text-sm text-center mb-4">MBBS, MD – General Physician</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-blue-300">Mon–Fri</span>
                  <span className="font-medium">9AM – 7PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-blue-300">Saturday</span>
                  <span className="font-medium">9AM – 2PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-blue-300">Sunday</span>
                  <span className="text-orange-300 font-medium">Emergency Only</span>
                </div>
              </div>
            </div>

            {/* WhatsApp quick book */}
            <a
              href="https://wa.me/108?text=Hi%20SmartCare%2C%20I%20want%20to%20book%20an%20appointment"
              target="_blank"
              rel="noreferrer"
              className="block card p-5 bg-green-600 text-white text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-2xl mb-2">💬</div>
              <p className="font-bold text-sm">Book via WhatsApp</p>
              <p className="text-green-100 text-xs mt-1">Get instant confirmation</p>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
