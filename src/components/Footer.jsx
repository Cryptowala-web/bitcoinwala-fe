import React from "react";
import { motion } from "framer-motion";

function Footer() {
  const logoAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

   const textRevealVariant = {
    hidden: { opacity: 0, y: 10, clipPath: 'inset(100% 0 0 0)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 }
    }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5
      }
    }
  };
  return (
    <footer className="relative bg-[#1a1a1a] text-white mt-6">
      {/* Floating Logo */}
      <motion.div
        variants={logoAnimation}
        whileHover="hover"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] z-10 rounded-full"
      >
          <img
            src="/logo.svg"
            alt="Bitcoinwala logo"
            className="h-16 sm:h-20 md:h-25"
          />
      </motion.div>

      {/* Top Section */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-16 pb-6 px-4">
        <div className="text-center">
          <motion.p variants={textRevealVariant} className="text-sm text-gray-400">Contact</motion.p>
          <motion.p
                      variants={slideUp} // Keeping existing slideUp for the email as it's more prominent
                      className="text-sm text-white mb-4"
                      whileHover={{ scale: 1.2 }}
          >
          hello@bitcoinwala.ai
          </motion.p>
        </div>
      </div>

      {/* Bottom Border Line Section */}
      <div className="bg-black py-2 border-t border-gray-800">
        <motion.p variants={textRevealVariant} className="text-center text-sm text-gray-400">
          © 2025. Bitcoinwala All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
