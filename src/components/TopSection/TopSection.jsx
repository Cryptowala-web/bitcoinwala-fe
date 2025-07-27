// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Bitcoin } from "lucide-react";
// const lines = ["A Mission", "Fueled by Bitcoin", "Driven by Vision"];

// function JellooText() {

//   const logoAnimation = {
//     hidden: { scale: 0.8, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//         damping: 20,
//         duration: 0.8,
//       },
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.3 },
//     },
//   };

//   return (
//     <section className="relative h-[700px] flex items-center justify-center overflow-hidden bg-gradient-dark">
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, -20, 0],
//               rotate: [0, 360],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 4 + i,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.5,
//             }}
//           >
//             <Bitcoin className="text-primary opacity-20" size={15 + i * 8} />
//           </motion.div>
//         ))}
//       </div>

//       <div className="relative z-10 container mx-auto px-6 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           {lines.map((line, index) => (
//             <motion.h1
//               key={index}
//               className="sm:text-2xl text-white md:text-7xl lg:text-8xl font-bold mb-2 bg-gradient-bitcoin bg-clip-text text-transparent" style={{ fontFamily: "'Orbitron', sans-serif" }}
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               {line}
//             </motion.h1>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// export default JellooText;

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./TopSection.module.css";

const lines = ["A Mission", "Fueled by Bitcoin", "Driven by Vision"];

function JellooText() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const target = document.getElementById("sparkles-section");

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative my-50 flex flex-col  gap-19 items-center justify-center overflow-hidden bg-gradient-dark">
      <div className="relative z-10 container mx-auto px-6 text-center">
        {lines.map((line, index) => {
          const isBitcoinLine = line.includes("Bitcoin");
          const parts = isBitcoinLine ? line.split("Bitcoin") : [line];

          return (
            <motion.h1
              key={index}
              // className="block text-center text-white mb-2 text-sm sm:text-xl md:text-5xl lg:text-6xl bg-clip-text text-transparent"
              className="block text-center text-white mb-2 
  text-xs sm:text-lg md:text-3xl lg:text-5xl xl:text-6xl 
  bg-clip-text text-transparent"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + index * 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {isBitcoinLine ? (
                <>
                  {parts[0]}
                  <span className="text-orange-400">Bitcoin</span>
                  {parts[1]}
                </>
              ) : (
                line
              )}
            </motion.h1>
          );
        })}
      </div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src="/bitlogo-hover.png"
            alt="Animated"
            className={`${styles.image} ${styles.secondImage}`}
          />
        </div>
      </div>
    </section>
  );
}

export default JellooText;
