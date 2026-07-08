import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, UserCheck, Star } from 'lucide-react';

const stats = [
  { icon: UserCheck, value: 5000, suffix: '+', label: 'Happy Patients', color: 'text-accent' },
  { icon: Clock, value: 15, suffix: '+', label: 'Years Experience', color: 'text-secondary-400' },
  { icon: ShieldCheck, value: 8, suffix: '+', label: 'Specialties', color: 'text-yellow-400' },
  { icon: Star, value: 4.9, suffix: '★', label: 'Patient Rating', color: 'text-orange-400' },
];

const reasons = [
  {
    emoji: '🏥',
    title: 'Modern Facilities',
    desc: 'State-of-the-art diagnostic equipment and a comfortable, sterile environment.',
  },
  {
    emoji: '⚡',
    title: 'Quick Appointments',
    desc: 'Book online in minutes. No long waits — we respect your time.',
  },
  {
    emoji: '🤝',
    title: 'Personalized Care',
    desc: 'Each patient receives individual attention tailored to their unique health needs.',
  },
  {
    emoji: '📱',
    title: 'Easy Follow-up',
    desc: 'WhatsApp & phone support for post-consultation queries and prescription refills.',
  },
];

function CountUpNumber({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const isDecimal = String(target).includes('.');
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20">
      {/* Stats band */}
      <div className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon size={28} className={stat.color} />
                </div>
                <div className={`font-headline text-4xl font-bold text-white mb-1`}>
                  <CountUpNumber target={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reasons */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-secondary-50 text-secondary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why SmartCare?
            </span>
            <h2 className="section-title">Why Patients Choose Us</h2>
            <p className="section-subtitle">
              We combine medical expertise with genuine compassion to deliver exceptional healthcare.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="card p-6 text-center hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {reason.emoji}
                </div>
                <h3 className="font-headline font-bold text-textPrimary text-base mb-2">
                  {reason.title}
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
