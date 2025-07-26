// import React, { useEffect, useRef, useState } from "react";

// const BitcoinSentencesDisplay = () => {
//   const [visibleSections, setVisibleSections] = useState();
//   const sectionRefs = useRef([]);

//   const contentData = [
//     {
//       title: "The Future Doesn’t Wait. Neither Do We",
//       subtitle:
//         "You’ve heard of Bitcoin. Now meet the ones leading through it. Owning the next financial era.",
//     },
//     {
//       title: "Global Standards.",
//       subtitle:
//         "🇮🇳 Born in India, we’re India’s answer to sovereign-grade crypto capital. We hold Bitcoin because it’s truth in code. Secure. Strategic. Sovereign.",
//     },
//     {
//       title: "India needs a Leader in this Space",
//       subtitle: "Now it has One.",
//     },
//     {
//       title: "We are Bitcoinwala",
//       subtitle:
//         "A bold treasury house, an asset management company that doesn’t follow trends—we set them.",
//     },
//     {
//       title: "The End of Fiat Thinking",
//       subtitle: "The Rise of the Bitcoin Powerhouse.",
//     },
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const index = Number(entry.target.getAttribute("data-index"));
//           if (entry.isIntersecting) {
//             setVisibleSections((prev) => new Set(prev).add(index));
//           }
//         });
//       },
//       {
//         threshold: 0.2,
//       }
//     );

//     sectionRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black font-orbitron text-white px-4 md:px-10 py-20 space-y-16">
//       <h1 className="text-center text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-glow mb-12">
//         ₿ITCOIN
//       </h1>

//       {contentData.map((content, index) => {
//         const isVisible = visibleSections.has(index);
//         const isLeft = index % 2 === 0;

//         return (
//           <div
//             key={index}
//             ref={(el) => (sectionRefs.current[index] = el)}
//             data-index={index}
//             className={`flex flex-col md:flex-row ${
//               isLeft ? "md:flex-row" : "md:flex-row-reverse"
//             } items-center gap-6 md:gap-12 transition-all duration-1000 ease-out ${
//               isVisible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-10"
//             }`}
//           >
//             <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 rounded-full blur-3xl animate-pulse" />

//             {/* Content Card */}
//             <div className="backdrop-blur-lg bg-white/5 p-6 md:p-8 rounded-2xl shadow-md w-full md:w-2/3 relative group hover:shadow-white/20 transition-all duration-500">
//               <h3 className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
//                 {content.title}
//               </h3>
//               <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
//                 {content.subtitle}
//               </p>

//               {/* Light streak animation */}
//               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
//             </div>
//           </div>
//         );
//       })}

//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@300;500;700&display=swap");

//         .font-orbitron {
//           font-family: "Orbitron", monospace;
//         }

//         @keyframes glow {
//           0%,
//           100% {
//             text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
//           }
//           50% {
//             text-shadow: 0 0 40px rgba(255, 255, 255, 0.6),
//               0 0 60px rgba(255, 255, 255, 0.3);
//           }
//         }

//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BitcoinSentencesDisplay;
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const contentData = [
  {
    title: "The Future Doesn't Wait. Neither Do We",
    subtitle:
      "You've heard of Bitcoin. Now meet the ones leading through it. Owning the next financial era.",
  },
  {
    title: "Global Standards.",
    subtitle:
      "🇮🇳 Born in India, we're India's answer to sovereign-grade crypto capital. We hold Bitcoin because it's truth in code. Secure. Strategic. Sovereign.",
  },
  {
    title: "India needs a Leader in this Space",
    subtitle: "Now it has One.",
  },
  {
    title: "We are Bitcoinwala",
    subtitle:
      "A bold treasury house, an asset management company that doesn't follow trends—we set them.",
  },
  {
    title: "The End of Fiat Thinking",
    subtitle: "The Rise of the Bitcoin Powerhouse.",
  },
];

const AnimatedText = ({ text, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <span ref={ref} className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.02,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const AnimatedBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      className="mb-4"
    >
      {children}
    </motion.div>
  );
};

const BitcoinSentencesDisplay = () => {
  return (
    <div
      className="py-20 sm:mx-10 md:px-50 bg-black text-white space-y-24"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      {contentData.map((item, index) => (
        <div
          key={index}
          className={`container mx-auto grid lg:grid-cols-2 items-center gap-12 ${
            index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content */}
          <div
            className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
          >
            <AnimatedBlock delay={index * 0.2}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
                {item.title}
              </h2>
            </AnimatedBlock>

            <AnimatedBlock delay={index * 0.4}>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                {item.subtitle}
              </p>
            </AnimatedBlock>
          </div>

          {/* Empty Placeholder to Maintain Grid */}
          <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`} />
        </div>
      ))}
    </div>
  );
};
// const BitcoinSentencesDisplay = () => {
//   return (
//    <div
//   className="py-20 px-4 sm:px-0 md:px-10 lg:px-20 bg-black text-white"
//   style={{ fontFamily: "'Orbitron', sans-serif" }}
// >
//   <div className="space-y-80">
//     {contentData.map((item, index) => (
//       <div
//         key={index}
//         className={` grid lg:grid-cols-2 items-center gap-12 ${
//           index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
//         }`}
//       >
//         {/* Content */}
//         <div
//           className={`space-y-6  ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
//         >
//           <AnimatedBlock delay={index * 0.2}>
//             <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
//               {item.title}
//             </h2>
//           </AnimatedBlock>

//           <AnimatedBlock delay={index * 0.4}>
//             <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
//               {item.subtitle}
//             </p>
//           </AnimatedBlock>
//         </div>

//         {/* Empty Placeholder to Maintain Grid */}
//         <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`} />
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// const BitcoinSentencesDisplay = () => {
//   return (
//     <div
//       className="py-20 px-4 sm:px-0 md:px-10 lg:px-20 bg-black text-white"
//       style={{ fontFamily: "'Orbitron', sans-serif" }}
//     >
//       {contentData.map((item, index) => (
//         <div
//           key={index}
//           className={`mb-32 grid lg:grid-cols-2 items-center gap-12 ${
//             index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
//           }`}
//         >
//           {/* Text Content */}
//           <div
//             className={`space-y-24 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
//           >
//             <AnimatedBlock delay={index * 0.2}>
//               <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
//                 {item.title}
//               </h2>
//             </AnimatedBlock>

//             <AnimatedBlock delay={index * 0.4}>
//               <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
//                 {item.subtitle}
//               </p>
//             </AnimatedBlock>
//           </div>

//           {/* Placeholder for Grid Layout */}
//           <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`} />
//         </div>
//       ))}
//     </div>
//   );
// };

export default BitcoinSentencesDisplay;
