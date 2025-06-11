import React from 'react';
import { MapPin } from 'lucide-react';
import Subscribe from './subscribe.jsx';
import { motion } from 'framer-motion';

function ComingSoonSection({ isSubscribeOpen, setIsSubscribeOpen }) {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
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

  const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-black relative h-screen w-full">
      <motion.div
        variants={slideUp}
        className="max-w-6xl mx-auto relative">
        {/* Green dot and tagline centered */}
        <motion.div
          variants={slideUp}
          className="flex flex-col items-center mb-24">
          <motion.div
            variants={slideUp}
            whileHover={{ scale: 1.4 }}
            className="mb-2">
            <img src="/greendot.svg" alt="Bitcoin" className="w-8 h-8" />
          </motion.div>
          <motion.p
            variants={slideUp}
            className="text-xl text-[#4c4747] tracking-wider text-center"
            style={{ letterSpacing: '0.1em' }}>
            Born Sovereign, Global by Force, Bitcoin by Choice
          </motion.p>
        </motion.div>

        <motion.div
          variants={slideUp}
          className="flex flex-col md:flex-row">
          {/* Left side - Coming Soon text */}
          <motion.div
            variants={slideUp}
            className="md:w-1/2">
            <motion.h2
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-100 mb-4 orbitron"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.1em',
                fontWeight: 300
              }}>
              Coming Soon..!
            </motion.h2>

            <motion.p
              variants={slideUp}
              className="text-base text-white mb-8 text-xl">
              Join the New Standard
            </motion.p>

            <motion.div
              variants={slideUp}
              className="md:mb-12">
              <motion.button
                className="m-0 p-0 border-none bg-transparent group relative w-fit"
                onClick={() => setIsSubscribeOpen(true)}
                whileHover={buttonAnimation.hover}
                whileTap={buttonAnimation.tap}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Default image */}
                <motion.img
                  src="/subscribe.svg"
                  alt="Subscribe"
                  className="h-10 sm:h-12 md:h-14 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />

                {/* Hover image */}
                <motion.img
                  src="/subscribearow.png"
                  alt="Subscribe Hover"
                  className="absolute top-0 left-0 h-10 sm:h-12 md:h-14 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                />
              </motion.button>

              <Subscribe
                show={isSubscribeOpen}
                closeModal={() => setIsSubscribeOpen(false)}
              />
            </motion.div>
          </motion.div>

          {/* Right side - Map */}
          <motion.div
            variants={slideUp}
            className=" md:mt-10 top-1/3 md:mt-0 md:w-1/2 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-1/4 ">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group">
              <motion.img
                src="/map.png"
                alt="World Map"
                className="mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none object-contain opacity-50 group-hover:opacity-0 transition-opacity duration-300"
                style={{ maxHeight: '523px' }}
              />
              <motion.img
                src="/map-hover.png"
                alt="World Map Hover"
                className="absolute inset-0 mx-auto md:mx-0 w-full max-w-[300px] md:max-w-none object-contain opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{ maxHeight: '523px' }}
              />
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default ComingSoonSection;
