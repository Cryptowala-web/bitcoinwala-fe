// import { useState } from "react";
// import { motion } from "framer-motion";

// const whitepaperContent = [
//   {
//     title: "A Mission",
//     content: "Fueled by Bitcoin\nDriven by Vision",
//   },
//   {
//     title: "Abstract",
//     content:
//       "This paper introduces the BitcoinWala Standard — a long-term model rooted in Bitcoin’s fixed supply and designed specifically for investors, institutions, and sovereign allocators. BitcoinWala is not a hedge against the fiat system; it is a strategic alternative to it. As global financial systems strain under the weight of inflation, debt cycles, and centralization, BitcoinWala offers an Indian response: a sovereign, disciplined, and future-focused Bitcoin-native financial architecture. The company exists to build a parallel system — stronger, fairer, and built to last.",
//   },
//   {
//     title: "01. Introduction",
//     content:
//       "India has always trusted in hard assets. Historically, it was gold — a tangible, enduring store of value. In the digital era, that role now belongs to Bitcoin. Scarce, decentralized, and globally verifiable, Bitcoin is the financial bedrock for the 21st century. BitcoinWala is an entity founded not to follow fiat convention, but to depart from it. Our framework is designed around Bitcoin’s absolute scarcity, not fiat elasticity. We do not merely hold Bitcoin as an asset — we are building an institutional structure that operates on top of it, scales with it, and reflects its principles. While legacy firms diversify to hedge uncertainty, BitcoinWala concentrates to build clarity.",
//   },
//   {
//     title: "02. Accelerating Bitcoin in India",
//     content:
//       "Mass adoption of Bitcoin in India will not happen by accident. It must be engineered through consistent effort, cultural alignment, and educational clarity. BitcoinWala exists to accelerate that adoption at every level of Indian society. This includes building modular, vernacular educational content that meets users where they are — from school students to business leaders. It means launching engaging, value-driven media content that resonates with both India’s heritage and its tech-forward ambition. And it means creating access — real access — for individuals, corporates, and sovereign portfolios to hold Bitcoin securely, compliantly, and confidently. BitcoinWala aims to become the financial and cultural layer that brings Bitcoin from a misunderstood asset to a national imperative. The vision is clear: every Indian should own Bitcoin, every Indian business should hold Bitcoin on its balance sheet, and India must lead — not follow — the Bitcoin era.",
//   },
//   {
//     title: "03. Structuring for Strategic Bitcoin Reserves",
//     content:
//       "Our model does not rely on passive exposure or inflation-hedged baskets. We are building an operating structure where Bitcoin is the core balance sheet asset. Our treasury model is long-term, conviction-driven, and designed to withstand macroeconomic turbulence. Where others protect against inflation, we aim to eliminate its relevance. Our structure is capable of scaling — intelligently designed to align future capital inflows with Bitcoin accumulation, and optimize reserve strategies for growth, preservation, and credibility. Our framework allows the firm to deploy instruments, attract capital, and increase strategic reserves while maintaining alignment with the Bitcoin ethos.",
//   },
//   {
//     title: "04. Building Institutional Bitcoin Infrastructure",
//     content:
//       "Bitcoin is not just digital gold — it is programmable financial infrastructure. BitcoinWala is establishing the architecture required to build financial products and services directly on Bitcoin rails. We are creating capabilities that serve both individual and institutional capital — from reserve management to Bitcoin-native strategies, from asset structuring to scalable on-ramp systems. We are not bolting Bitcoin onto traditional systems; we are originating models that emerge from Bitcoin’s first principles: security, transparency, and trustless design. Our infrastructure is engineered to scale with strategic capital and support the transformation of India’s financial landscape.",
//   },
//   {
//     title: "05. Vision for an Economic Transition",
//     content:
//       "It’s not being built for the next fiscal quarter — we are building for the next financial era. BitcoinWala is designed for a future where corporate performance is measured in Bitcoin per share, not diluted fiat returns. Where capital formation is no longer anchored to credit expansion, but to monetary certainty. We envision an India where families, corporates, and sovereign bodies move away from perpetual debasement toward financial sovereignty. Our structure enables long-term planning, capital flexibility, and organic Bitcoin accumulation — all within a disciplined framework that reflects the values of sound money and strategic patience.",
//   },
//   {
//     title: "06. Conclusion",
//     content:
//       "BitcoinWala is not just an asset manager — it is an institution forged for a new monetary era. Purpose-built to anchor India’s transition to the Bitcoin Standard, it operates with a singular mission: to accumulate, preserve, and scale Bitcoin as the foundation of long-term capital strength. With uncompromising discipline and a structure free from fiat dependencies, BitcoinWala is engineered to raise strategic capital, steward sovereign-grade reserves, and architect the next generation of financial infrastructure. We do not mirror the legacy system — we replace it. In a world abandoning monetary truth, India requires a new pillar of financial sovereignty — and that is BitcoinWala.",
//   },
// ];

// export default function WhitepaperReveal({data}) {
//     console.log("rtyuio", data)
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div
//       className="max-w-3xl mx-auto py-16 px-4 text-white mb-30"
//       style={{ fontFamily: "'Orbitron', sans-serif" }}
//     >
//       <h1 className="text-4xl font-bold text-center mb-10 border-b border-white pb-4">
//         Whitepaper
//       </h1>

//       <div className="bg-black border border-white rounded-xl overflow-hidden">
//         <motion.div
//           initial={{ maxHeight: 200 }}
//           animate={{ maxHeight: expanded ? 5000 : 200 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="overflow-hidden px-6 py-6 text-white text-base sm:text-sm leading-relaxed space-y-8"
//         >
//           {data.sections.map(({ heading, content }, index) => (
//             <div key={index}>
//               <h2 className="text-lg font-semibold mb-2 tracking-[3px]">
//                 {heading}
//               </h2>
//               <p className="tracking-[1px]">{content}</p>
//             </div>
//           ))}
//         </motion.div>

//         <div className="text-center py-4">
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="text-xs font-medium uppercase border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300"
//           >
//             {expanded ? "Collapse ▲" : "Expand ▼"}
//           </button>
//         </div>
//       </div>

//       <div className="text-center mt-12">
//         <a
//           href="/whitepaper.pdf"
//           download
//           className="inline-block border border-white text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black!"
//           style={{textDecoration:"none" , color:"white"}}
//         >
//          Download
//         </a>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function WhitepaperReveal({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  // const contentRef = useRef(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <div
      className="max-w-3xl mx-auto py-16 px-4 text-white mb-30"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h1 className="text-4xl font-bold text-center mb-10 border-b border-white pb-4">
        Whitepaper
      </h1>

      <div className="bg-black border border-white rounded-xl overflow-hidden">
        <motion.div
          initial={false}
          animate={{ height: expanded ? contentHeight : 200 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div
            ref={contentRef}
            className="px-6 py-6 text-white text-base sm:text-sm leading-relaxed space-y-8"
          >
            {data.sections.map(({ heading, content }, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold mb-2 tracking-[3px]">
                  {heading}
                </h2>
                <p className="tracking-[1px] whitespace-pre-line">{content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center py-4">
          <a
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-medium uppercase border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-black! transition-all duration-300"
            style={{ textDecoration: "none", color: "white" }}
          >
            {expanded ? "Collapse ▲" : "Expand ▼"}
          </a>
        </div>
      </div>

      {/* <div className="text-center mt-12">
        <a
          href="/whitepaper.pdf"
          download
          className="inline-block border border-white text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black"
          style={{ textDecoration: "none" }}
        >
          Download
        </a>
      </div> */}
      <div className="text-center mt-12">
        <a
          href="/wp.pdf"
          download
          className="inline-block border border-white text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-white hover:text-black!"
          style={{textDecoration:"none" , color:"white"}}
        >
         Download
        </a>
      </div>
    </div>
  );
}
