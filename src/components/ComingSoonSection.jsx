import Subscribe from "./subscribe.jsx";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ContentContext } from "../context/ContextProvider.jsx";
import GlowingWorldMap from "./WorldMap/Map.tsx";

function ComingSoonSection({ isSubscribeOpen, setIsSubscribeOpen }) {
  const content = useContext(ContentContext);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
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
        duration: 0.5,
      },
    },
  };

  const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-black w-full"
    >
      <motion.div variants={slideUp} className="max-w-6xl mx-auto">
        {/* Top Centered Tagline */}
        <motion.div
          variants={slideUp}
          className="flex flex-col items-center mb-16"
        >
          <motion.div variants={slideUp} whileHover={{ scale: 1.4 }} className="mb-2">
            <img src="/greendot.svg" alt="Bitcoin" className="w-8 h-8" />
          </motion.div>
          <motion.p
            variants={slideUp}
            className="text-xl tracking-wider text-center text-white mb-10"
            style={{ letterSpacing: "0.1em" }}
          >
            {content.coming[2] || "Born Sovereign, Global by Force, Bitcoin by Choice"}
          </motion.p>
        </motion.div>

        {/* Main Flex Row */}
        <motion.div
          variants={slideUp}
          className="flex flex-col md:flex-row items-start justify-between w-full gap-8"
        >
          {/* Left Column */}
          <motion.div
            variants={slideUp}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <motion.h2
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-100 mb-4 orbitron"
              style={{
                fontFamily: "Orbitron, sans-serif",
                letterSpacing: "0.1em",
                fontWeight: 300,
              }}
            >
              {content.coming[0] || "Coming Soon..!"}
            </motion.h2>

            <motion.p
              variants={slideUp}
              className="text-base text-white mb-8 text-xl"
            >
              {content.coming[1] || "Join the New Standard"}
            </motion.p>

            <motion.div variants={slideUp}>
              <motion.button
                className="m-0 p-0 border-none bg-transparent group relative w-fit"
                onClick={() => setIsSubscribeOpen(true)}
                whileHover={buttonAnimation.hover}
                whileTap={buttonAnimation.tap}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.img
                  src="/subscribe.svg"
                  alt="Subscribe"
                  className="h-10 sm:h-12 md:h-14 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                />
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

          {/* Right Column: Map */}
          <motion.div
            variants={slideUp}
            className="w-full md:w-1/2 flex justify-center md:justify-start items-start"
          >
            <div className="leading-none sm:-mt-10 md:-mt-20 p-0">
              <GlowingWorldMap />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default ComingSoonSection;
