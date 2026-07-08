import { motion } from 'framer-motion';
import ContactSection from '../components/ContactSection';

export default function Contact() {
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
            📍 Find Us
          </span>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl mb-4">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            We're always happy to hear from you. Reach out with any questions or to book an appointment.
          </p>
        </motion.div>
      </div>

      <ContactSection />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline font-bold text-3xl text-textPrimary text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does a typical appointment take?',
                a: 'A standard consultation takes 15–30 minutes. Specialist referrals or complex cases may take longer.',
              },
              {
                q: 'Do I need to bring anything to my appointment?',
                a: 'Please bring your previous medical records, prescription list, and insurance card if applicable.',
              },
              {
                q: 'Can I book for a family member?',
                a: 'Yes! You can book appointments for family members. Simply mention their details in the form.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept cash, UPI, credit/debit cards, and major health insurance plans.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-5"
              >
                <h3 className="font-semibold text-textPrimary mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary-100 rounded-full text-primary text-xs flex items-center justify-center font-bold flex-shrink-0">
                    Q
                  </span>
                  {faq.q}
                </h3>
                <p className="text-textSecondary text-sm pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
