// "use client";

// import { useScroll, useTransform, motion } from "motion/react";
// import React, { useEffect, useRef, useState } from "react";

// export const Timeline = ({ data }) => {
//   const ref = useRef(null);
//   const containerRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (ref.current) {
//       const rect = ref.current.getBoundingClientRect();
//       setHeight(rect.height);
//     }
//   }, [ref]);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start 10%", "end 50%"],
//   });

//   const opacityTransform = useTransform(
//     scrollYProgress,
//     [0, 0.02, 1],
//     [0, 1, 1]
//   );

//   const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

//   return (
//     <div className="w-full font-sans px-4 md:px-10" ref={containerRef}>
//       <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row justify-start pt-10 md:pt-20 md:gap-10 relative"
//           >
//             {/* Left side: dot + line + title */}
//             <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
//               <div className="flex flex-col items-center relative">
//                 {/* Animated dot */}
//                 <motion.div
//                   initial={{ scale: 0, opacity: 0 }}
//                   whileInView={{ scale: 1, opacity: 1 }}
//                   viewport={{ once: true, amount: 0.5 }}
//                   transition={{ duration: 0.5, ease: "easeOut" }}
//                   className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
//                 />
//                 {/* Connecting line below dot */}
//                 {index < data.length - 1 && (
//                   <motion.div
//                     initial={{ height: 0 }}
//                     whileInView={{
//                       height: 80, // increased for better mobile readability
//                     }}
//                     viewport={{ once: true, amount: 0.5 }}
//                     transition={{ duration: 0.5, ease: "easeOut" }}
//                     className="w-[2px] md:w-[3px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent mt-2"
//                   />
//                 )}
//               </div>

//               <motion.h3
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, amount: 0.5 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 // className="md:block md:pl-10 text-2xl md:text-3xl font-bold text-neutral-500 dark:text-neutral-500"
//                 className="block md:pl-10 text-2xl md:text-3xl font-bold text-neutral-500 dark:text-neutral-500"
//               >
//                 {item.title}
//               </motion.h3>
//             </div>

//             {/* Right side: content */}
//             <div className="relative pl-10 md:pl-4 pr-4 w-full">
//               {/* <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
//                 {item.title}
//               </h3> */}
//               {item.content}
//             </div>
//           </div>
//         ))}

//         {/* Optional global vertical animation */}
//         <motion.div
//           style={{
//             height: heightTransform,
//             opacity: opacityTransform,
//           }}
//           className="absolute left-[18px] md:left-8 top-0 w-[2px] md:w-[3px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
//         />
//       </div>
//     </div>
//   );

// };

"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.02, 1],
    [0, 1, 1]
  );

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <div className="w-full font-sans px-4 sm:px-6 md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-start pt-6 sm:pt-10 md:pt-20 md:gap-10 relative"
          >
            {/* Left side: dot + line + title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 sm:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="flex flex-col items-center relative">
                {/* Animated dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
                />
                {/* Connecting line below dot */}
                {index < data.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{
                      height: 80, // increased for better mobile readability
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-[2px] md:w-[3px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent mt-2"
                  />
                )}
              </div>

              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="block md:pl-10 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-500 dark:text-neutral-500 mt-2 md:mt-0"
              >
                {item.title}
              </motion.h3>
            </div>

            {/* Right side: content */}
            <div className="relative pl-6 sm:pl-10 md:pl-4 pr-4 w-full mt-4 md:mt-0">
              {item.content}
            </div>
          </div>
        ))}

        {/* Optional global vertical animation */}
        <motion.div
          style={{
            height: heightTransform,
            opacity: opacityTransform,
          }}
          className="absolute left-[18px] md:left-8 top-0 w-[2px] md:w-[3px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
        />
      </div>
    </div>
  );
};