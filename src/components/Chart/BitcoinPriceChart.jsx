import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BitcoinChart = () => {
  const [priceData, setPriceData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const isMobile = window.innerWidth < 640;
  const xTicks = priceData
    .filter((item, index, arr) => {
      const date = new Date(item.date);
      const prevDate = index > 0 ? new Date(arr[index - 1].date) : null;
      return !prevDate || date.getMonth() !== prevDate.getMonth();
    })
    .map((item) => item.date);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        // CoinGecko BTC price history for past 180 days
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
        );
        const data = await res.json();
        const formattedData = data.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: parseFloat(item[1].toFixed(2)),
        }));
        setPriceData(formattedData);
        console.log("forjkna", formattedData);
        setCurrentPrice(formattedData[formattedData.length - 2].price);
      } catch (error) {
        console.error("Failed to fetch Bitcoin price data:", error);
      }
    };

    fetchPriceData();
  }, []);

  return (
    <div
      className="bg-black text-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto mb-30"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Bitcoin</h2>
        <p className="text-lg sm:text-xl text-gray-300">
          <span className="text-white font-semibold">
            {currentPrice ? `$${currentPrice.toLocaleString()}` : "Loading..."}
          </span>
        </p>
      </div>

      <div className="h-[400px] w-full  focus:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <XAxis
              dataKey="date"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 30, right: 10 }}
              ticks={isMobile ? xTicks.filter((_, i) => i % 2 === 0) : xTicks}
            />
            <YAxis
              domain={[65000, "auto"]}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}K`}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #333",
                borderRadius: "10px", // apply here, not in labelStyle
                padding: "10px",
              }}
              labelStyle={{
                color: "black", // only styles the label text
                fontWeight: "bold", // optional
                fontSize: "14px", // optional
              }}
              itemStyle={{
                color: "black", // ✅ this controls the value color
                fontSize: "14px",
              }}
              formatter={(value) => [`$${value}`]}
            />
            <Line
              type="linear"
              dataKey="price"
              stroke="white"
              strokeWidth={3}
              // dot={false}
              isAnimationActive={true}
              strokeDasharray="2 1"
              // className="glow-line"
              dot={(props) => {
                const { cx, cy, index, data } = props;
                const isLast = index === priceData.length - 1;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isLast ? 6 : 0}
                    fill="white"
                    stroke="gray"
                    strokeWidth={2}
                    className={isLast ? "glow-line animate-pulse" : ""}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BitcoinChart;
