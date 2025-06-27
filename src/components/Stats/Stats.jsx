import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from "framer-motion";

const CountUp = ({ target, prefix = "", duration = 1.5 }) => {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplay(latest);
  });

  useEffect(() => {
    setShouldAnimate(true);
    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
      onComplete: () => setShouldAnimate(false),
    });
    return controls.stop;
  }, [target]);

  return (
    <motion.span
      animate={{
        scale: shouldAnimate ? 1.2 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      {prefix}
      {Number(display).toLocaleString()}
    </motion.span>
  );
};
// export default CountUp;

// export default CountUp;

const Stats = () => {
  const [prices, setPrices] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchBitcoinPrices = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr,eur,gbp"
      );
      const data = await res.json();
      setPrices(data.bitcoin);
    };

    fetchBitcoinPrices();

    const interval = setInterval(fetchBitcoinPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center bg-black text-white py-10 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center font-orbitron">
        Bitcoin Prices
      </h2>

      {!prices && (
        <motion.div
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading prices...
        </motion.div>
      )}

      {prices && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {[
            { label: "USD", value: prices.usd, symbol: "$" },
            { label: "INR", value: prices.inr, symbol: "₹" },
            { label: "EUR", value: prices.eur, symbol: "€" },
            { label: "GBP", value: prices.gbp, symbol: "£" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-xl ..."
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              animate={{
                y: [0, -5, 0],
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                },
                opacity: { duration: 0.7 },
                scale: { duration: 0.7 },
              }}
            >
              <div className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                {item.label}
              </div>
              <AnimatePresence>
                <motion.div
  key={item.value}
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  onViewportEnter={() => setIsVisible(true)}
  exit={{ opacity: 0, y: -10 }}
  className="text-2xl sm:text-3xl font-bold text-white"
>
  {isVisible ? (
    <CountUp
      target={item.value}
      prefix={item.symbol}
      duration={2}
    />
  ) : (
    <span>{item.symbol} 0</span>
  )}
</motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stats;
