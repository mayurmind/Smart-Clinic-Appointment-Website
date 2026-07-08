import { motion } from 'framer-motion';
import ServicesSection from '../components/ServicesSection';

export default function Services() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-hero-gradient pt-32 pb-20 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-white/15 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mb-4">Our Specialized Services</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Comprehensive healthcare solutions for you and your entire family.
          </p>
        </motion.div>
      </div>

      {/* All Services (no limit) */}
      <ServicesSection />

      {/* Advanced Diagnostics Image Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="/images/medical_consultation.png" 
                alt="Medical Consultation Room" 
                className="rounded-[2rem] shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-headline font-bold text-3xl text-textPrimary mb-6">Advanced Diagnostic Technology</h2>
              <p className="text-textSecondary text-lg leading-relaxed mb-6">
                Our consultation rooms are equipped with the latest medical technology to ensure accurate diagnosis and effective treatment plans. We continuously upgrade our facilities to provide the highest standard of care across all specialties.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl text-textPrimary mb-3">How It Works</h2>
            <p className="text-textSecondary">Simple steps to get the care you need.</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '1', emoji: '📱', title: 'Book Online', desc: 'Fill out the appointment form in under 2 minutes.' },
              { step: '2', emoji: '✅', title: 'Confirmation', desc: 'Receive SMS/WhatsApp confirmation within 24 hours.' },
              { step: '3', emoji: '🏥', title: 'Visit Clinic', desc: 'Arrive at your scheduled time — no long waiting.' },
              { step: '4', emoji: '💊', title: 'Get Better', desc: 'Receive diagnosis, treatment, and follow-up care.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center relative"
              >
                {i < 3 && (
                  <div className="hidden sm:block absolute top-6 left-3/4 w-1/2 h-0.5 bg-primary-100 z-0" />
                )}
                <div className="relative z-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-button">
                  {item.step}
                </div>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-headline font-bold text-textPrimary text-sm mb-1">{item.title}</h3>
                <p className="text-textSecondary text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
