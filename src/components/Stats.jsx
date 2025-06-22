// AnimatedStats.jsx
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import {
  FaUsers,
  FaCoins,
  FaExchangeAlt,
  FaBitcoin,
  FaGlobe,
} from "react-icons/fa";

import BtcDominanceChart from "./BitCoinDomininace";
const formatNumber = (num) =>
  num >= 1e12
    ? `$${(num / 1e12).toFixed(2)}T`
    : num >= 1e9
    ? `$${(num / 1e9).toFixed(2)}B`
    : num >= 1e6
    ? `$${(num / 1e6).toFixed(2)}M`
    : `$${Math.floor(num).toLocaleString()}`;

const StatBox = ({ label, value, Icon, tooltip }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const spring = useSpring({
    number: inView ? value : 0,
    config: { duration: 1200 },
  });

  return (
    <div
      ref={ref}
      className="relative group bg-zinc-900 text-yellow-400 shadow-lg rounded-xl p-6 w-64 text-center transition-transform hover:scale-105"
    >
      <div className="flex justify-center text-3xl mb-2">
        <Icon />
      </div>
      <animated.h2 className="text-4xl font-bold">
        {spring.number.to((n) =>
          typeof value === "number" && label.includes("%")
            ? `${n.toFixed(2)}%`
            : label.includes("Market Cap")
            ? formatNumber(n)
            : Math.floor(n).toLocaleString()
        )}
      </animated.h2>
      <p className="text-yellow-200 mt-2 text-lg">{label}</p>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-white bg-black bg-opacity-70 px-2 py-1 rounded transition-opacity duration-300 pointer-events-none">
          {tooltip}
        </div>
      )}
    </div>
  );
};

const AnimatedStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/global");
        const { data } = await res.json();

        const preparedStats = {
          users: Math.floor(data.total_market_cap.usd / 10000), // simulated
          transactions: Math.floor(data.total_volume.usd),
          coins: data.active_cryptocurrencies,
          marketCap: data.total_market_cap.usd,
          btcDominance: data.market_cap_percentage.btc,
        };

        setStats(preparedStats);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-yellow-400 text-xl animate-pulse">
        Fetching live market stats...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-6 py-10">
      <StatBox
        label="Total Users"
        value={stats.users}
        Icon={FaUsers}
        tooltip="Simulated based on market cap"
      />
      <StatBox
        label="Transactions (24h)"
        value={stats.transactions}
        Icon={FaExchangeAlt}
        tooltip="24-hour trading volume in USD"
      />
      <StatBox
        label="Coins Listed"
        value={stats.coins}
        Icon={FaCoins}
        tooltip="Active cryptocurrencies on the market"
      />
      <StatBox
        label="Market Cap"
        value={stats.marketCap}
        Icon={FaGlobe}
        tooltip="Total crypto market capitalization"
      />
      <StatBox
        label="BTC Dominance"
        value={stats.btcDominance}
        Icon={FaBitcoin}
        tooltip="Bitcoin share of total market cap"
      />
      <div className="bg-black min-h-screen text-white">
        <h1 className="text-3xl text-center py-6 text-yellow-400">
          BTC Dominance Overview
        </h1>
        <BtcDominanceChart />
      </div>
    </div>
  );
};

export default AnimatedStats;
