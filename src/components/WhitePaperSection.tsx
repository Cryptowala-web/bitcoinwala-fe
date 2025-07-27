import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function WhitepaperReveal({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
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
    </div>
  );
}
