import { AnimatePresence, motion } from "framer-motion";

export default function CustomAlert({ message, show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 rounded-lg bg-black text-white px-6 py-3 shadow-lg border border-white"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">{message}</span>
            <button onClick={onClose} className="text-white hover:text-gray-300 p-2">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
