import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function HeroSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "6rem", // 24 in tailwind units
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <section ref={ref} className="h-screen relative overflow-hidden">
      {/* Video Overlay for better text readability */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 w-full h-full bg-transparent bg-opacity-40 z-5"
      ></motion.div>

      {/* Hero Panel */}
      <motion.div
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full h-full flex flex-col items-center justify-center relative z-10"
      >
        <motion.div
          variants={lineVariants}
          className="absolute top-12 h-0.5 bg-gray-400"
        ></motion.div>

        <div className="text-center z-10 mt-130 px-4 w-full">
          <motion.h2
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-100 mb-10 orbitron"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              letterSpacing: '0.1em',
              fontWeight: 300,
              lineHeight: '1.4', // Added line-height for more space between lines
            }}
          >
            A Mission &nbsp;
            <br />
            Fueled by Bitcoin, <br className="sm:hidden" />Driven by Vision
          </motion.h2>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group relative text-gray-500 hover:text-white transition-colors w-30 h-20 inline-block"
          >
            <motion.img
              src="rightarrow.png"
              alt="Arrow pointing right"
              className="ml-10 absolute transition-opacity duration-1600 opacity-100 group-hover:opacity-0"
            />
            <motion.img
              src="rightarrow-hover.png"
              alt="Arrow pointing right - hover state"
              className="absolute transition-opacity duration-600 opacity-0 group-hover:opacity-100"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;