import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const contactItems = [
  {
    icon: Phone,
    title: 'Call Us',
    value: '108',
    sub: 'Available 24/7 for emergencies',
    href: 'tel:108',
    color: 'text-primary',
    bg: 'bg-primary-50',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: 'info@smartcare.clinic',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@smartcare.clinic',
    color: 'text-secondary',
    bg: 'bg-secondary-50',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Health Street',
    sub: 'Medical Colony, City – 400001',
    href: 'https://maps.google.com',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const whatsappMsg = encodeURIComponent('Hello SmartCare Clinic! I would like to book an appointment.');

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.title === 'Visit Us' ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card p-6 text-center group hover:-translate-y-2 block"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={24} className={item.color} />
              </div>
              <h3 className="font-headline font-bold text-textPrimary mb-1">{item.title}</h3>
              <p className={`font-semibold text-base ${item.color} mb-1`}>{item.value}</p>
              <p className="text-textSecondary text-sm">{item.sub}</p>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white text-center mb-12"
        >
          <div className="text-4xl mb-3">💬</div>
          <h3 className="font-headline font-bold text-2xl mb-2">Chat on WhatsApp</h3>
          <p className="text-green-100 mb-6 max-w-md mx-auto">
            Get instant responses to your queries, appointment confirmations, and prescription follow-ups.
          </p>
          <a
            href={`https://wa.me/108?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-700 font-bold px-8 py-3.5 rounded-xl hover:bg-green-50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            <MessageCircle size={20} />
            Start WhatsApp Chat
          </a>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card overflow-hidden h-72 md:h-96"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160990571!2d72.74109995!3d19.082502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SmartCare Clinic Location"
          />
        </motion.div>
      </div>
    </section>
  );
}
