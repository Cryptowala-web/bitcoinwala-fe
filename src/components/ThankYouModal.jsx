import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ThankYouModal({ show, onClose }) {
  useEffect(() => {
    if (show) {
      console.log("ThankYouModal is now visible");
    }
  }, [show]);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.3 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
          {/* Blurred background overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          {/* Main Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md border border-gray-500 rounded-2xl p-4 sm:p-6 grid place-items-center"
            style={{
              backgroundColor: "#1a1a1a", // Matches the dark background from the image
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
              maxWidth: "430px",
            }}
          >
            {/* Header logo */}
            <motion.div
              variants={logoVariants}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] z-10 rounded-full"
            >
              <img
                src="/logo.svg"
                alt="BitcoinWala"
                className="h-16 sm:h-20 md:h-25"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={textVariants} className="text-center mb-10">
              <p
                className="text-white text-xl"
                style={{
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                  fontSize: "24px",
                  marginTop: "30px",
                }}
              >
                Thank you for Subscribing!
              </p>
            </motion.div>

            {/* Okay Button */}
            <motion.div
              variants={buttonVariants}
              className="flex justify-center w-50 h-auto"
            >
              <motion.button
                onClick={onClose}
                whileHover="hover"
                whileTap="tap"
              >
                <img src="okay.png" alt="okay" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ThankYouModal;
