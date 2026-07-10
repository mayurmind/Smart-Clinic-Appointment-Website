import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

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
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          fill="currentColor"
          className="relative z-10"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.748.002-2.602-1.01-5.05-2.85-6.892-1.837-1.84-4.285-2.853-6.885-2.855-5.439 0-9.867 4.373-9.87 9.751-.001 1.83.479 3.614 1.39 5.182L1.897 21.05l5.244-1.378zm11.19-6.425c-.299-.149-1.764-.87-2.037-.97-.272-.1-.471-.149-.669.149-.198.299-.769.97-.942 1.169-.173.199-.347.224-.646.074-.3-.15-1.264-.465-2.408-1.486-.89-.792-1.49-1.77-1.665-2.07-.173-.299-.018-.46.131-.609.135-.133.298-.348.448-.522.151-.174.2-.299.3-.497.099-.198.05-.372-.025-.521-.075-.15-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.299-1.04 1.018-1.04 2.484 0 1.466 1.065 2.88 1.213 3.08.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.764-.719 2.012-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </motion.a>
    </div>
  );
}
