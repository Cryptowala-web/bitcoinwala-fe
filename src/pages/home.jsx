import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import components
import HeroSection from '../components/HeroSection.jsx';
import MissionSection from '../components/MissionSection.jsx';
import ComingSoonSection from '../components/ComingSoonSection.jsx';
import Footer from '../components/Footer.jsx';

function HomePage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  
  const sectionVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const sectionTransition = {
    duration: 0.6,
  };

  return (
    <div className="relative min-h-full bg-black text-white font-['Montserrat',_sans-serif] overflow-y-scroll h-screen hide-scrollbar">
      {/* Hero Section */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <HeroSection />
      </motion.div>
      
      {/* Mission Section */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <MissionSection isMobile={isMobile} />
      </motion.div>

      {/* Coming Soon Section */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <ComingSoonSection 
          isSubscribeOpen={isSubscribeOpen} 
          setIsSubscribeOpen={setIsSubscribeOpen} 
        />
      </motion.div>
      
      {/* Footer */}
      <motion.div
        variants={sectionVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={sectionTransition}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default HomePage;