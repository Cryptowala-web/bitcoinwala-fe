// import React, { useEffect, useState } from 'react';
// import styles from './TopSection.module.css';

// export const JellooText = () => {
//  const text = 'A mission Fueled by bitcoin, driven by vision';
//   const letters = text.split('');

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.textWrapper}>
//         {letters.map((char, index) => (
//           <span
//             key={index}
//             className={styles.letter}
//             style={{
//               animationDelay: `${index * 0.05}s`,
//               animationPlayState: mounted ? 'running' : 'paused',
//             }}
//           >
//             {char === ' ' ? '\u00A0' : char}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JellooText;

import { useEffect, useState } from "react";
import styles from "./TopSection.module.css";
import { motion } from "framer-motion";
import Subscribe from "../subscribe";
import { MaskContainer } from "../Title/Title";

const lines = ["A Mission", "Fueled by Bitcoin", "Driven by Vision"];

export const JellooText = () => {
  const itemVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const [showSubscribe, setShowSubscribe] = useState(false);

  const openSubscribe = () => {
    console.log("true");
    setShowSubscribe(true);
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.heading}>
      <MaskContainer
        size={40}
        revealSize={500}
        className="h-[600px] w-full flex items-center justify-center bg-white text-black dark:bg-black dark:text-white"
        revealText={
          <div
            className="
                flex 
                flex-col 
                items-center 
                justify-center 
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
                gap-6
                text-black 
                dark:text-white
                max-w-[90%]
                mx-auto
              "
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span>A Mission</span>
            <span>Fueled by Bitcoin</span>
            <span>Driven by Vision</span>
          </div>
        }
      >
        <div
          className="
              flex 
              flex-col 
              items-center 
              justify-center 
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
              text-[#fc5603]
              font-bold
              text-center
              max-w-[90%]
              mx-auto
            "
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span>A Mission Fueled by Bitcoin</span>
          <span>Driven by Vision</span>
        </div>
      </MaskContainer>
      <motion.div
        onClick={() => openSubscribe()}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer group relative text-gray-500 hover:text-white transition-colors w-30 h-20 inline-block align-self"
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

      <Subscribe
        show={showSubscribe}
        closeModal={() => setShowSubscribe(false)}
      />
    </div>
  );
};

export default JellooText;
