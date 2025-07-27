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
      className=" sm: mx-10 md:px-50 py-20 bg-black text-white space-y-24"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      {contentData.map((item, index) => (
        <div
          key={index}
          className={`container mx-auto grid lg:grid-cols-2 items-center gap-12 ${
            index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
          }`}
        >
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

export default BitcoinSentencesDisplay;
