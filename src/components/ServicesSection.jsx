import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    emoji: '🩺',
    title: 'General Consultation',
    description: 'Comprehensive health checkups, diagnosis, and treatment plans for adults and seniors.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    textColor: 'text-blue-600',
  },
  {
    emoji: '👶',
    title: 'Pediatrics',
    description: 'Specialized care for infants, children, and adolescents from birth through teenage years.',
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    textColor: 'text-green-600',
  },
  {
    emoji: '❤️',
    title: 'Cardiology',
    description: 'Heart health assessments, ECG, blood pressure management, and cardiac risk evaluation.',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    textColor: 'text-red-600',
  },
  {
    emoji: '✨',
    title: 'Dermatology',
    description: 'Skin, hair, and nail care including acne treatment, allergy testing, and cosmetic procedures.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    textColor: 'text-purple-600',
  },
  {
    emoji: '🦴',
    title: 'Orthopedics',
    description: 'Bone, joint, and muscle care including fracture treatment, physiotherapy, and pain management.',
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    textColor: 'text-orange-600',
  },
  {
    emoji: '🦷',
    title: 'Dental Care',
    description: 'Complete dental services including cleaning, fillings, extractions, and cosmetic dentistry.',
    color: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
    textColor: 'text-cyan-600',
  },
  {
    emoji: '🧠',
    title: 'Neurology',
    description: 'Expert care for brain, spinal cord, and nervous system disorders, including migraines and neuropathy.',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    textColor: 'text-indigo-600',
  },
  {
    emoji: '🤰',
    title: 'Gynecology',
    description: 'Comprehensive women\'s health services, prenatal care, and reproductive health management.',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    textColor: 'text-pink-600',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function ServicesSection({ limit }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="section-title">Our Specialized Services</h2>
          <p className="section-subtitle">
            Expert care across a wide range of medical disciplines — all under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="card p-6 group cursor-pointer hover:-translate-y-2"
              onClick={() => navigate('/services')}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.bg} border ${service.border} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.emoji}
              </div>

              <h3 className={`font-headline font-bold text-lg text-textPrimary mb-2 group-hover:${service.textColor} transition-colors duration-200`}>
                {service.title}
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className={`flex items-center gap-1 ${service.textColor} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <span>Learn more</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => navigate('/services')}
              className="btn-outline inline-flex items-center gap-2"
            >
              View All Services
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
