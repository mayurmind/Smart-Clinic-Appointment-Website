import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-xl rounded-xl px-4 py-3 text-sm font-medium text-textPrimary border border-gray-100 text-center flex flex-col"
          >
            <span className="text-green-600 font-bold mb-0.5">Chat on WhatsApp</span>
            <span className="text-gray-500 text-xs">We typically reply in minutes</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href="https://wa.me/108?text=Hi%20SmartCare%2C%20I%20have%20a%20query"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-2xl text-white relative transition-colors"
      >
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>
        <MessageCircle size={30} className="fill-current" />
      </motion.a>
    </div>
  );
}
