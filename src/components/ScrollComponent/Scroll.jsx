import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const contentData = [
  {
    title: "The Future Doesn’t Wait. Neither Do We",
    subtitle:
      "You’ve heard of Bitcoin. Now meet the ones who are Leading through it. Owning the next financial era.",
  },
  {
    title: "Global Standards.",
    subtitle:
      "🇮🇳 Born in India, We’re India’s answer to sovereign-grade crypto capital. We hold Bitcoin because it’s truth in code. Secure. Strategic. Sovereign.",
  },
  {
    title: "India needs a Leader in this Space",
    subtitle: "Now it has One",
  },
  {
    title: "We are Bitcoinwala",
    subtitle:
      "A bold treasury house, an asset management Company that doesn’t follow trends, we set them",
  },
  {
    title: "The end of Fiat thinking",
    subtitle: "The rise of Bitcoin Powerhouse",
  },
];

const ScrollSection = ({ title, subtitle, alignRight }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className={`section py-2 px-6 md:px-20 min-h-[50vh] flex items-center ${
        alignRight ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
      >
        <h2 className="text-3xl md:text-5xl font-light mb-4">{title}</h2>
        <p className="text-lg md:text-xl font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

const BitcoinScrollComponent = () => {
  return (
    <div
      className="bg-black text-white font-orbitron overflow-x-hidden"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      {contentData.map((item, index) => (
        <ScrollSection
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          alignRight={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default BitcoinScrollComponent;
