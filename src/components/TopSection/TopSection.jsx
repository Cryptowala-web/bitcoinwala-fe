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
import {
  motion,
} from "framer-motion";
import Subscribe from "../subscribe";

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
    <div className={styles.container}>
      <div className={styles.heading}>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className={styles.line}>
            {line.split("").map((char, charIndex) => (
              <span
                key={`${lineIndex}-${charIndex}`}
                className={styles.letter}
                style={{
                  animationDelay: `${(
                    lineIndex * 0.3 +
                    charIndex * 0.05
                  ).toFixed(2)}s`,
                  animationPlayState: mounted ? "running" : "paused",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        ))}
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
      </div>

      <Subscribe
        show={showSubscribe}
        closeModal={() => setShowSubscribe(false)}
      />
    </div>
  );
};

export default JellooText;
