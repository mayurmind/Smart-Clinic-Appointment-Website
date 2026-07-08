import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, ChevronRight, Activity, Shield, Award } from 'lucide-react';

const floatingBadges = [
  { icon: Shield, label: '15+ Years', sub: 'Experience', color: 'bg-secondary', top: '10%', right: '8%' },
  { icon: Activity, label: '5000+', sub: 'Patients', color: 'bg-accent', bottom: '35%', right: '2%' },
  { icon: Award, label: '4.9★', sub: 'Rating', color: 'bg-primary-700', bottom: '15%', left: '2%' },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 30%, #1976D2 55%, #0277BD 80%, #01579B 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientBG 10s ease infinite',
        }}
      />

      {/* Animated blobs */}
      <div className="hero-blob w-96 h-96 bg-blue-400" style={{ top: '-10%', left: '-5%' }} />
      <div className="hero-blob w-80 h-80 bg-cyan-400" style={{ bottom: '0%', right: '20%', animationDelay: '3s' }} />
      <div className="hero-blob w-64 h-64 bg-green-400" style={{ top: '30%', right: '-5%', animationDelay: '5s' }} />

      {/* Medical cross pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              Now Accepting New Patients
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            >
              Book Your Clinic <span className="block text-accent">Appointment Online</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-blue-100 text-lg leading-relaxed mb-8 max-w-lg font-medium tracking-wide"
            >
              Fast, easy, and trusted appointment booking for patients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                onClick={() => navigate('/book')}
                className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base"
              >
                <CalendarCheck size={20} />
                Book Appointment
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1 text-base"
              >
                Contact Clinic
                <ChevronRight size={18} />
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {['👨‍⚕️', '👩‍⚕️', '👨‍⚕️'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-blue-100 text-sm">
                <span className="text-white font-bold text-base">5000+</span> patients trust us
              </div>
            </motion.div>
          </div>

          {/* Right — Doctor Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main card */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center"
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">👨‍⚕️</div>
                  <h3 className="font-headline font-bold text-white text-xl">Dr. Arjun Sharma</h3>
                  <p className="text-blue-200 text-sm mt-1">MBBS, MD — General Physician</p>
                  <div className="mt-4 flex justify-center gap-3">
                    {['⭐', '⭐', '⭐', '⭐', '⭐'].map((s, i) => (
                      <span key={i} className="text-yellow-400">{s}</span>
                    ))}
                  </div>
                  <p className="text-blue-200 text-xs mt-1">4.9/5 Patient Rating</p>
                </div>
              </div>

              {/* Floating badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                  style={{ position: 'absolute', ...badge }}
                  className={`${badge.color} text-white px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold`}
                >
                  <badge.icon size={14} />
                  <div>
                    <div className="font-bold leading-none">{badge.label}</div>
                    <div className="opacity-80 text-[10px]">{badge.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
