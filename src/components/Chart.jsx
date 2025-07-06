import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnimatedPrice = ({ value }) => {
  const spring = useSpring({
    val: value || 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.span>
      {spring.val.to((val) => `$${val.toFixed(2)}`)}
    </animated.span>
  );
};

const COINS = ["bitcoin", "ethereum", "litecoin"];

export default function CryptoDashboard() {
  const [historyData, setHistoryData] = useState({});
  const [prices, setPrices] = useState({});

  // Fetch historical data
  useEffect(() => {
    COINS.forEach((id) => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`
      )
        .then((res) => res.json())
        .then((data) => {
          setHistoryData((prev) => ({
            ...prev,
            [id]: data.prices.map((p) => ({ t: new Date(p[0]), y: p[1] })),
          }));
        })
        .catch((err) => console.error(`Error fetching ${id} history:`, err));
    });
  }, []);

  // Fetch real-time prices every 10 seconds
  useEffect(() => {
    const fetchPrices = () => {
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(
          ","
        )}&vs_currencies=usd`
      )
        .then((res) => res.json())
        .then((data) => setPrices(data))
        .catch((err) => console.error("Error fetching live prices:", err));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  // Animated ticker
  const tickerSprings = COINS.reduce((acc, id) => {
    acc[id] = useSpring({
      val: prices[id]?.usd || 0,
      config: { tension: 120, friction: 14 },
    });
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Price Ticker</h2>
      <div style={{ display: "flex", gap: 40 }}>
        {COINS.map((id) => (
          <div key={id} style={{ textAlign: "center" }}>
            <strong>{id.charAt(0).toUpperCase() + id.slice(1)}</strong>
            <div style={{ fontSize: "1.5rem" }}>
              <AnimatedPrice value={prices[id]?.usd} />
            </div>
          </div>
        ))}
      </div>

      <hr />

      <h2>30-Day Price Trends</h2>
      <Line
        data={{
          labels: historyData.bitcoin
            ?.slice(-30)
            .map((p) => p.t.toLocaleDateString()),
          datasets: COINS.map((id, i) => ({
            label: id,
            data: historyData[id]?.slice(-30).map((p) => p.y),
            borderColor: ["#f7931a", "#3c3c3d", "#bebebe"][i],
            tension: 0.3,
          })),
        }}
        options={{ animation: { duration: 1000 } }}
      />

      <hr />

      <h2>Portfolio Allocation (Sample Doughnut)</h2>
      <div style={{ width: 500, height: 500 }}>
        <Doughnut
          data={{
            labels: COINS,
            datasets: [
              {
                data: COINS.map((id) => historyData[id]?.slice(-1)[0]?.y || 0),
                backgroundColor: ["#f7931a", "#3c3c3d", "#bebebe"],
              },
            ],
          }}
          options={{
            animation: { animateScale: true },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
