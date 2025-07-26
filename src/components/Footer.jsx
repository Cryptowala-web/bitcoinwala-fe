// import React from "react";
// import { motion } from "framer-motion";
// import { useContext } from "react";
// import { useState, useEffect } from "react";
// import { ContentContext } from "../context/ContextProvider";

// function Footer() {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const isMobile = windowWidth < 768;
//   const content = useContext(ContentContext);
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

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const textRevealVariant = {
//     hidden: { opacity: 0, y: 10, clipPath: "inset(100% 0 0 0)" },
//     visible: {
//       opacity: 1,
//       y: 0,
//       clipPath: "inset(0% 0 0 0)",
//       transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.2 },
//     },
//   };

//   const slideUp = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//         duration: 0.5,
//       },
//     },
//   };
//   return (
//     <footer className="relative bg-[#1a1a1a] text-white mt-6 flex flex-col justify-center align-items-center font-orbitron" style={{ fontFamily: "'Orbitron', sans-serif" }}>
//       <motion.div variants={slideUp} initial="hidden" animate="visible">
//         <div className="max-w-5xl mx-auto flex flex-col  items-center justify-between px-4 md:px-8 pt-10 md:pt-16 space-y-6 md:space-y-0">
//           <div className="text-center">
//             {/* <motion.h3 className="flex text-lg sm:text-xl text-white mb-4 tracking-widest justify-center md:justify-start">
//               <motion.img
//                 src="/line.svg"
//                 className="mr-2 w-4 h-4 sm:w-auto sm:h-auto text-center"
//                 alt="line"
//               />
//               Connect
//             </motion.h3> */}

//             <motion.div
//               variants={staggerContainer}
//               initial="hidden"
//               animate="visible"
//               className="flex justify-center md:justify-start space-x-6 sm:space-x-8 mt-2"
//             >
//               <motion.h3 className="flex text-lg sm:text-xl text-white mb-4 tracking-widest justify-center md:justify-start">
//               <motion.img
//                 src="/line.svg"
//                 className="mr-2 w-4 h-4 sm:w-auto sm:h-auto text-center"
//                 alt="line"
//               />
//               Connect
//             </motion.h3>
//               {[
//                 {
//                   href: "https://x.com/Bitcoinwalax?t=pR2Fmib9FeSt6f_PGjGBMQ&s=09",
//                   img: "x",
//                 },
//                 {
//                   href: "https://www.instagram.com/bitcoinwala.x?igsh=NXhqbjY0NHp2ZnRu",
//                   img: "insta",
//                 },
//                 {
//                   href: "https://www.linkedin.com/company/bitcoinwalaofficial",
//                   img: "linkedin",
//                 },
//                 { href: "https://t.me/bitcoinwalax", img: "telegram" },
//               ].map((social, index) => (
//                 <motion.a
//                   key={index}
//                   variants={slideUp}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group relative w-5 h-6 sm:w-6 sm:h-7"
//                 >
//                   <motion.img
//                     src={`${social.img}.png`}
//                     className="absolute w-full h-full opacity-100 group-hover:opacity-0"
//                   />
//                   <motion.img
//                     src={`${social.img}-hover.png`}
//                     className="absolute w-full h-full opacity-0 group-hover:opacity-100"
//                   />
//                 </motion.a>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//       <div className="max-w-5xl mx-auto flex flex-col items-center justify-center pt-12 pb-6 px-4">
//         <div className="text-center">
//           <motion.p
//             variants={textRevealVariant}
//             className="text-sm text-gray-400"
//           >
//             {content.footer[0] || "Contact Us"}
//           </motion.p>
//           <motion.p
//             variants={slideUp}
//             className="text-sm text-white mb-4"
//             whileHover={{ scale: 1.2 }}
//           >
//             {content.footer[1] || "bitcoinwalaofficial@gmail.com "}
//           </motion.p>
//           <motion.p
//           variants={textRevealVariant}
//           className="text-center text-sm text-gray-400"
//         >
//           {content?.copyrights?.[0] ||
//             "© 2025. Bitcoinwala All Rights Reserved."}
//         </motion.p>
//         </div>
//       </div>
//       {/* <div className="bg-black py-2 border-t border-gray-800">
//         <motion.p
//           variants={textRevealVariant}
//           className="text-center text-sm text-gray-400"
//         >
//           {content?.copyrights?.[0] ||
//             "© 2025. Bitcoinwala All Rights Reserved."}
//         </motion.p>
//       </div> */}
//     </footer>
//   );
// }

// export default Footer;

import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ContentContext } from "../context/ContextProvider";

function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth < 768;

  const content = useContext(ContentContext);

  const textFade = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: [0.25, 0.8, 0.25, 1],
      },
    }),
  };

  const iconFade = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const socialLinks = [
    {
      href: "https://x.com/Bitcoinwalax?t=pR2Fmib9FeSt6f_PGjGBMQ&s=09",
      img: "x",
    },
    {
      href: "https://www.instagram.com/bitcoinwala.x?igsh=NXhqbjY0NHp2ZnRu",
      img: "insta",
    },
    {
      href: "https://www.linkedin.com/company/bitcoinwalaofficial",
      img: "linkedin",
    },
    {
      href: "https://t.me/bitcoinwalax",
      img: "telegram",
    },
  ];

  return (
    <footer
      className="bg-[#0f0f0f] text-white w-full px-4 py-10 mt-10"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* <motion.h3
          className="text-xl sm:text-2xl tracking-widest flex items-center justify-center"
          variants={textFade}
          initial="hidden"
          animate="visible"
        >
          <img src="/line.svg" alt="line" className="w-4 h-4 mr-2" />
          Connect
        </motion.h3> */}

        <motion.div
          className="flex space-x-6 sm:space-x-8 justify-center"
          initial="hidden"
          animate="visible"
        >
          {/* <motion.h3
            className="text-xl sm:text-2xl tracking-widest flex items-center justify-center font-bold"
            variants={textFade}
            initial="hidden"
            animate="visible"
          >
            <img src="/line.svg" alt="line" className="w-4 h-4 mr-2" />
            Connect
          </motion.h3> */}
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              custom={i}
              variants={iconFade}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-6 h-6 sm:w-7 sm:h-7"
            >
              <motion.img
                src={`${social.img}.png`}
                className="absolute w-full h-full opacity-100 group-hover:opacity-0"
                alt={`${social.img} icon`}
              />
              <motion.img
                src={`${social.img}-hover.png`}
                className="absolute w-full h-full opacity-0 group-hover:opacity-100"
                alt={`${social.img} hover icon`}
              />
            </motion.a>
          ))}
        </motion.div>

        <div className="pt-4">
          <motion.p
            className="text-sm text-gray-400 font-bold mb-1"
            variants={textFade}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            {content.footer?.[0] || "Contact Us"}
          </motion.p>

          <motion.p
            className="text-sm text-white"
            variants={textFade}
            custom={3}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            {content.footer?.[1] || "bitcoinwalaofficial@gmail.com"}
          </motion.p>
        </div>

        <motion.hr
          className="w-full border-t border-gray-800 my-4"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2 }}
        />

        <motion.p
          className="text-s text-gray-500"
          variants={textFade}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          {content?.copyrights?.[0]
            ? `© ${new Date().getFullYear()} ${content?.copyrights?.[0]}`
            : "© 2025. Bitcoinwala. All Rights Reserved."}
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
