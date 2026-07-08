import { motion } from 'framer-motion';
import DoctorProfile from '../components/DoctorProfile';

export default function About() {
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
            About Us
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mb-4">About SmartCare Clinic</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            A premier multi-specialty healthcare center delivering compassion, expertise, and comprehensive care.
          </p>
        </motion.div>
      </div>

      {/* Doctor Profile */}
      <DoctorProfile />

      {/* World-Class Facilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-headline font-bold text-3xl text-textPrimary mb-6">World-Class Facilities</h2>
              <p className="text-textSecondary text-lg leading-relaxed mb-6">
                Our clinic is designed to provide a healing, comfortable environment. With warm lighting, premium wooden accents, and state-of-the-art medical equipment, we ensure that every patient feels relaxed and well-cared for from the moment they walk in.
              </p>
              <p className="text-textSecondary text-lg leading-relaxed">
                Experience healthcare that combines modern medical science with a premium, hospitality-like atmosphere.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="/images/patient_care.png" 
                alt="Hospital Hallway" 
                className="rounded-[2rem] shadow-2xl w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline font-bold text-3xl text-textPrimary mb-6">Our Philosophy</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { emoji: '💙', title: 'Patient First', desc: 'Every decision is made with the patient\'s best interest at heart.' },
                { emoji: '🔬', title: 'Evidence-Based', desc: 'Treatments grounded in the latest medical research and clinical guidelines.' },
                { emoji: '🌱', title: 'Preventive Care', desc: 'We believe prevention is the best medicine — guiding you toward a healthier lifestyle.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card p-6 text-center"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-headline font-bold text-textPrimary mb-2">{item.title}</h3>
                  <p className="text-textSecondary text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
