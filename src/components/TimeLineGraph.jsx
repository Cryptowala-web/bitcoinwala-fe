import React, { useRef, useEffect, useState } from "react";
import {
  Bitcoin,
  TrendingUp,
  Landmark,
  Globe,
  Zap,
  DollarSign,
} from "lucide-react";
import { useContext } from "react";
import { ContentContext } from "../context/ContextProvider";

const timelineData = [
  {
    year: "2008",
    event: "Satoshi Nakamoto published Bitcoin whitepaper",
    details:
      "On October 31, 2008, Satoshi introduced Bitcoin in a paper describing a peer-to-peer electronic cash system.",
    icon: Bitcoin,
  },
  {
    year: "2009",
    event: "Bitcoin network launched, genesis block mined",
    details:
      "The Bitcoin network officially started on January 3, 2009, with the mining of the genesis block containing a hidden message.",
    icon: Zap,
  },
  {
    year: "2010",
    event: "First real-world Bitcoin transaction",
    details:
      "In May 2010, Laszlo Hanyecz paid 10,000 BTC for two pizzas, marking the first documented real-world Bitcoin purchase.",
    icon: DollarSign,
  },
  {
    year: "2011",
    event: "Bitcoin reaches parity with USD",
    details:
      "In February 2011, Bitcoin reached a value of $1 per BTC for the first time, gaining significant attention.",
    icon: TrendingUp,
  },
  {
    year: "2012",
    event: "First Bitcoin halving",
    details:
      "In November 2012, the block reward was reduced from 50 to 25 BTC per block, reducing the rate of new supply.",
    icon: Zap,
  },
  {
    year: "2013",
    event: "Bitcoin hits $100",
    details:
      "In 2013, Bitcoin reached $100 for the first time and saw growing interest from media and investors.",
    icon: TrendingUp,
  },
  {
    year: "2014",
    event: "Mt. Gox collapses",
    details:
      "In early 2014, the largest Bitcoin exchange, Mt. Gox, filed for bankruptcy after losing approximately 850,000 BTC.",
    icon: DollarSign,
  },
  {
    year: "2015",
    event: "Bitcoin sees infrastructure improvements",
    details:
      "In 2015, Bitcoin development focused on scalability and security, with the launch of projects like the Lightning Network concept.",
    icon: Globe,
  },
  {
    year: "2016",
    event: "Second Bitcoin halving",
    details:
      "On July 9, 2016, the block reward was halved from 25 BTC to 12.5 BTC, continuing Bitcoin’s deflationary issuance.",
    icon: Zap,
  },
  {
    year: "2017",
    event: "Bitcoin surpasses $20,000",
    details:
      "Bitcoin reached an all-time high of nearly $20,000 in December 2017 during a major bull run.",
    icon: TrendingUp,
  },
  {
    year: "2018",
    event: "Crypto winter begins",
    details:
      "Following its 2017 high, Bitcoin fell sharply throughout 2018, dropping to around $3,200 by year-end.",
    icon: DollarSign,
  },
  {
    year: "2019",
    event: "Institutional interest grows",
    details:
      "2019 saw growing institutional interest in Bitcoin, with firms like Fidelity and Bakkt entering the space.",
    icon: Globe,
  },
  {
    year: "2020",
    event: "Third Bitcoin halving",
    details:
      "On May 11, 2020, Bitcoin’s block reward halved from 12.5 BTC to 6.25 BTC, sparking renewed bullish sentiment.",
    icon: Zap,
  },
  {
    year: "2021",
    event: "Bitcoin adoption and ATH",
    details:
      "El Salvador adopted Bitcoin as legal tender, and BTC reached an all-time high of $69,000 amid institutional inflows.",
    icon: TrendingUp,
  },
  {
    year: "2022",
    event: "Bitcoin market downturn",
    details:
      "Throughout 2022, Bitcoin’s price declined significantly, affected by macroeconomic conditions and crypto firm collapses.",
    icon: DollarSign,
  },
  {
    year: "2023",
    event: "ETF applications surge",
    details:
      "Multiple Bitcoin ETF applications gained traction in 2023, signaling increasing institutional adoption.",
    icon: Globe,
  },
  {
    year: "2024",
    event: "Fourth Bitcoin halving",
    details:
      "In 2024, the block reward reduced from 6.25 BTC to 3.125 BTC, tightening new supply and fueling speculation.",
    icon: Zap,
  },
  {
    year: "2025",
    event: "Global Bitcoin regulation framework expected",
    details:
      "Many expect 2025 to bring clearer global regulations for Bitcoin and crypto, fostering broader institutional acceptance.",
    icon: Landmark,
  },
];


const BitcoinTimelineGraph = () => {
  const [hovered, setHovered] = useState(null);
  const trackRef = useRef(null);
  const content = useContext(ContentContext);

  // Animate the carousel scrolling
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const step = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (hovered == null && trackRef.current) {
        trackRef.current.scrollLeft += delta * 0.1;
        if (
          trackRef.current.scrollLeft >=
          trackRef.current.scrollWidth - trackRef.current.clientWidth
        ) {
          trackRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hovered]);

  return (
    <div
      className="mt-5 bg-black text-white overflow-x-hidden flex flex-col items-center justify-center px-4"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <h1
        className="font-bold mb-6 text-white text-center"
        style={{
          fontSize: "clamp(0.875rem, 4vw, 1.75rem)",
        }}
      >
        {content.timeline || "Bitcoin Evolution Timeline"}
      </h1>

      <div
        ref={trackRef}
        className="relative w-screen max-w-7xl overflow-hidden"
      >
        <div className="flex  gap-8 py-8">
          {[...timelineData, ...timelineData].map((node, i) => {
            const Icon = node.icon;
            const isHovered = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative
                  shrink-0
                  transition-all duration-500
                  ${isHovered ? "scale-110 z-10" : "scale-100"}
                `}
                style={{
                  width: isHovered ? "250px" : "220px",
                  height: isHovered ? "350px" : "240px",
                }}
              >
                <div
                  className={`
                     flex flex-col justify-start gap-4 min-h-[220px] 
${isHovered ? "max-h-[500px]" : "max-h-[220px]"}
                      rounded-xl border border-white/10 
                      bg-gradient-to-br from-white/5 to-white/10
                      backdrop-blur-md
                      hover:shadow-xl
                      transition-all duration-500
                      overflow-hidden
                `}
                >
                  <div className="flex flex-col justify-start">
                    <div className="absolute -top-5 -left-5 w-20 h-20 z-0 rounded-full overflow-hidden">
                      <img
                        src="/bit1.png"
                        alt="Bitcoin"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <h2 className=" flex flex-col mt-12 gap-1 text-center text-base sm:text-lg font-bold mb-1 text-white break-words whitespace-normal">
                    <span className="text-xs sm:text-sm text-gray-300 font-semibold p-1">
                      {node.year}
                    </span>
                    {node.event}
                  </h2>

                  <div
                    className={`
      text-[6px] sm:text-xs text-gray-300 p-4 text-center
transition-opacity duration-[2000ms] ease-in-out delay-150
      ${isHovered ? "opacity-100  mt-2 whitespace-normal" : "opacity-0 max-h-0"}
      overflow-y-auto
    `}
                    style={{
                      transitionProperty: "opacity",
                    }}
                  >
                    {node.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BitcoinTimelineGraph;
