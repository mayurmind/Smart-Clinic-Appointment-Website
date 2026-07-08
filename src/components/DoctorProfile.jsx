import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { doctorsData } from '../data/doctors';
import { Shield, Activity, Award, Star, Clock, MapPin } from 'lucide-react';

export default function DoctorProfile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Meet Our Specialists
          </span>
          <h2 className="section-title">Our Expert Doctors</h2>
          <p className="section-subtitle">Dedicated healthcare professionals committed to your well-being</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {doctorsData.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative px-2 sm:px-6"
            >
              <div className="bg-[#2B70C9] rounded-[32px] p-8 sm:p-10 text-center text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                
                {/* Background Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.06]" 
                  style={{ 
                    backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', 
                    backgroundSize: '24px 24px' 
                  }} 
                />

                {/* Floating Badge - Top Right (Experience) */}
                <div className="absolute top-6 right-6 bg-[#3B8A3F] rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg z-10 hidden sm:flex">
                  <Shield size={18} className="text-white" />
                  <div className="text-left leading-none">
                    <div className="font-bold text-sm mb-1">{doc.experience} Years</div>
                    <div className="text-[10px] text-green-100 font-medium uppercase tracking-wide">Experience</div>
                  </div>
                </div>

                {/* Floating Badge - Middle Right (Patients) */}
                <div className="absolute top-1/2 right-0 sm:-right-2 bg-[#4DB0F7] rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg z-10 hidden sm:flex -translate-y-1/2">
                  <Activity size={18} className="text-white" />
                  <div className="text-left leading-none">
                    <div className="font-bold text-sm mb-1">{doc.patients}</div>
                    <div className="text-[10px] text-blue-100 font-medium uppercase tracking-wide">Patients</div>
                  </div>
                </div>



                {/* Avatar */}
                <div className="text-[100px] sm:text-[120px] leading-none mb-6 mt-4 sm:mt-8 relative z-0 inline-block drop-shadow-2xl">
                  {doc.emoji}
                </div>

                {/* Info */}
                <div className="relative z-10">
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl mb-2">{doc.name}</h3>
                  <p className="text-blue-100 text-sm sm:text-base mb-6 font-medium tracking-wide opacity-90">
                    {doc.degree} — {doc.specialty}
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={22} className="text-[#FFC107] fill-[#FFC107] drop-shadow-md" />
                    ))}
                  </div>
                  <p className="text-blue-200 text-sm font-medium mt-1 mb-4">{doc.rating}/5 Patient Rating</p>

                  {/* Timing & Address */}
                  <div className="bg-white/10 rounded-xl p-4 text-left border border-white/10 mt-6 backdrop-blur-sm">
                    <div className="flex items-start gap-3 mb-2">
                      <Clock size={16} className="text-green-300 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider mb-0.5">Timing</span>
                        <span className="text-sm font-medium">{doc.timing}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-red-300 mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] uppercase text-blue-200 font-bold tracking-wider mb-0.5">Clinic Address</span>
                        <span className="text-sm font-medium">{doc.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
