// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const whitepaperSections = [
//   {
//     title: "1. The Future Belongs to Nations That Embrace Bitcoin",
//     content: `In the past, India turned to gold as its timeless store of value, a cultural, emotional, and economic asset passed through generations...`,
//   },
//   {
//     title: "2. BitcoinWala's Mission",
//     content: `BitcoinWala, our mission is clear: to enable mass adoption of Bitcoin across Indian households, institutions, and sovereign portfolios...`,
//   },
//   {
//     title: "3. Building a Bitcoin-Native Treasury",
//     content: `We are a Bitcoin-only Asset Management & Treasury House, with a long-term vision to accumulate, preserve, and build around Bitcoin...`,
//   },
//   {
//     title: "4. A Generational Movement",
//     content: `We believe this is a generational movement, the transition from fiat to freedom, from control to sovereignty...`,
//   },
// ];

// export default function WhitepaperAccordion() {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggle = (idx: number) => {
//     setOpenIndex(openIndex === idx ? null : idx);
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-12 px-4 text-white">
//       <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">
//         BitcoinWala Whitepaper
//       </h1>

//       <div className="space-y-4">
//         {whitepaperSections.map((section, idx) => (
//           <div
//             key={idx}
//             className="border border-yellow-500 rounded-xl overflow-hidden"
//           >
//             <button
//               className="w-full text-left px-6 py-4 bg-black hover:bg-[#111] transition-colors font-semibold text-lg tracking-wide"
//               onClick={() => toggle(idx)}
//             >
//               {section.title}
//             </button>

//             <AnimatePresence>
//               {openIndex === idx && (
//                 <motion.div
//                   key="content"
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.4, ease: "easeInOut" }}
//                 >
//                   <div className="px-6 py-4 bg-[#0f0f0f] text-gray-300">
//                     {section.content}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-10">
//         <a
//           href="/whitepaper.pdf"
//           download
//           className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transition-all duration-300"
//         >
//           📥 Download Full PDF
//         </a>
//       </div>
//     </div>
//   );
// }

// components/WhitepaperAccordion.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const whitepaperSections = [
  {
    title: "The Future Belongs to Nations That Embrace Bitcoin",
    content: `In the past, India turned to gold as its timeless store of value, a cultural, emotional, and economic asset passed through generations. Today, the world is shifting towards a new form of gold — digital, scarce, decentralized — and that is Bitcoin...`,
  },
  {
    title: "BitcoinWala's Mission",
    content: `BitcoinWala, our mission is clear: to enable mass adoption of Bitcoin across Indian households, institutions, and sovereign portfolios. We envision a future where every Indian holds Bitcoin...`,
  },
  {
    title: "Building a Bitcoin-Native Treasury",
    content: `We are a Bitcoin-only Asset Management & Treasury House, with a long-term vision to accumulate, preserve, and build around Bitcoin...`,
  },
  {
    title: "A Generational Movement",
    content: `This is not just about investment, it's about reshaping the financial fabric of society. The next financial era will be written in code, cryptography, and conviction — and India must not lag behind...`,
  },
];

export default function WhitepaperAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className="max-w-3xl mx-auto py-16 px-4 my-10 text-white "
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h1 className="text-4xl font-bold text-center mb-12 border-b border-white pb-4">
        BitcoinWala Whitepaper
      </h1>

      <div className="space-y-4">
        {whitepaperSections.map((section, idx) => (
          <div key={idx} className=" rounded-xl overflow-hidden">
            <button
              className="w-full text-left px-6 py-4 bg-black hover:bg-neutral-900 transition-colors font-medium text-lg"
              onClick={() => toggle(idx)}
            >
              {section.title}
            </button>

            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="px-6 py-4 bg-neutral-950 text-white text-sm leading-relaxed">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 ">
        <a
          href="/whitepaper.pdf"
          download
          className="inline-block border border-white text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black!"
          style={{ textDecoration: "none", color: "white" }}
        >
          Download Full Whitepaper
        </a>
      </div>
    </div>
  );
}
