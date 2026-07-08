import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { servicesData as services } from '../data/services';

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
              onClick={() => navigate(`/service/${service.id}`)}
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
