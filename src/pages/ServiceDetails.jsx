import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/services';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-textPrimary mb-4">Service Not Found</h1>
        <p className="text-textSecondary mb-8">We couldn't find the medical service you're looking for.</p>
        <button onClick={() => navigate('/services')} className="btn-primary">
          View All Services
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-hero-gradient pt-32 pb-20 text-white relative overflow-hidden">
        <div className="hero-blob w-96 h-96 bg-white/10" style={{ top: '-10%', right: '-5%' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl border border-white/30">
              {service.emoji}
            </div>
            <h1 className="font-headline font-bold text-4xl sm:text-5xl mb-4">{service.title}</h1>
            <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto font-light">
              {service.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-xl p-8 sm:p-12 border border-gray-100"
        >
          <div className="prose prose-lg max-w-none text-textSecondary">
            <h2 className="text-2xl font-headline font-bold text-textPrimary mb-4">
              About {service.title}
            </h2>
            <p className="leading-relaxed mb-8">
              {service.longDescription}
            </p>

            <div className="bg-primary-50 rounded-2xl p-6 sm:p-8 mb-8">
              <h3 className="text-xl font-headline font-bold text-primary-900 mb-4">
                Key Treatments & Services
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`shrink-0 mt-0.5 ${service.textColor}`} size={20} />
                    <span className="font-medium text-textPrimary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-100">
              <button 
                onClick={() => navigate('/book')} 
                className="btn-primary w-full sm:w-auto text-lg px-8 py-3"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="btn-outline w-full sm:w-auto text-lg px-8 py-3"
              >
                Contact Clinic
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
