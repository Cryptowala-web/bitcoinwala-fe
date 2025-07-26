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
import { Bitcoin } from "lucide-react";

const lines = ["A Mission", "Fueled by Bitcoin", "Driven by Vision"];

function JellooText() {
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef < HTMLDivElement > null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      {/* <motion.div
        variants={logoAnimation}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="fixed top-4 left-4 z-50 transition-all duration-300"
      >
        <img
          src="/nobglogo.png"
          alt="Bitcoinwala logo"
          className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-lg"
        />
      </motion.div> */}
      <motion.div
        variants={logoAnimation}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300"
      >
        <img
          src="/nobglogo.png"
          alt="Bitcoinwala logo"
          className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-lg"
        />
      </motion.div>

      <section className="relative my-20 flex items-center justify-center overflow-hidden bg-gradient-dark">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <Bitcoin className="text-primary opacity-20" size={15 + i * 8} />
            </motion.div>
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* {lines.map((line, index) => (
            <motion.h1
              key={index}
              className="text-white font-bold mb-4 sm:text-2xl md:text-6xl lg:text-7xl bg-gradient-bitcoin bg-clip-text text-transparent"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + index * 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {line}
            </motion.h1>
          ))} */}
          {lines.map((line, index) => (
            <motion.h1
              key={index}
              className="block text-center text-white font-bold mb-2 text-sm sm:text-xl md:text-5xl lg:text-6xl bg-gradient-bitcoin bg-clip-text text-transparent"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 + index * 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {line}
            </motion.h1>
          ))}
        </div>
      </section>
    </>
  );
}

export default JellooText;
