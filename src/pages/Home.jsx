import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ClinicTiming from '../components/ClinicTiming';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import DoctorProfile from '../components/DoctorProfile';
import ContactSection from '../components/ContactSection';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <ClinicTiming />
      <ServicesSection limit={6} />
      <WhyChooseUs />

      {/* CTA Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-hero-gradient rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl mb-4">
                Ready to Book Your Appointment?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Don't wait. Take charge of your health today. Appointments confirmed within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/book')}
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CalendarCheck size={20} />
                  Book Appointment Now
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1"
                >
                  Contact Us
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <DoctorProfile />
      <ContactSection />
    </div>
  );
}
