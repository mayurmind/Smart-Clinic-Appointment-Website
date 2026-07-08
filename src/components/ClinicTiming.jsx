import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, CalendarDays, AlertTriangle } from 'lucide-react';

const timings = [
  {
    icon: CalendarDays,
    day: 'Monday – Friday',
    time: '9:00 AM – 7:00 PM',
    label: 'Regular Hours',
    color: 'text-primary',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
    badge: 'bg-primary text-white',
    badgeText: 'Open',
  },
  {
    icon: Clock,
    day: 'Saturday',
    time: '9:00 AM – 2:00 PM',
    label: 'Half Day',
    color: 'text-secondary',
    bg: 'bg-secondary-50',
    border: 'border-secondary-100',
    badge: 'bg-secondary text-white',
    badgeText: 'Open',
  },
  {
    icon: AlertTriangle,
    day: 'Sunday',
    time: 'Emergency Only',
    label: 'Emergency Cases',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    badge: 'bg-orange-500 text-white',
    badgeText: 'Emergency',
  },
];

export default function ClinicTiming() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="section-title">Clinic Hours</h2>
          <p className="section-subtitle">
            We're here when you need us most. Walk-ins welcome during regular hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`card p-6 border ${item.border} ${item.bg} hover:-translate-y-1 transition-all duration-300 cursor-default`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${item.bg} border ${item.border} rounded-xl flex items-center justify-center`}>
                  <item.icon size={22} className={item.color} />
                </div>
                <span className={`px-3 py-1 ${item.badge} rounded-full text-xs font-bold`}>
                  {item.badgeText}
                </span>
              </div>
              <h3 className="font-headline font-bold text-textPrimary text-lg mb-1">{item.day}</h3>
              <p className={`text-2xl font-bold ${item.color} mb-1`}>{item.time}</p>
              <p className="text-textSecondary text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Emergency Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-red-600 text-lg">🚨</span>
          </div>
          <p className="text-red-700 text-sm">
            <span className="font-semibold">Emergency?</span> Call us anytime at{' '}
            <a href="tel:+911234567890" className="font-bold underline">+91 12345 67890</a> or visit the nearest emergency room.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
