import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

export const BtcDominanceChart = () => {
  const [dominanceHistory, setDominanceHistory] = useState([]);
  const [labels, setLabels] = useState([]);
  const [currentDominance, setCurrentDominance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [btcChartRes, globalRes] = await Promise.all([
          fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30'),
          fetch('https://api.coingecko.com/api/v3/global'),
        ]);

        const btcChart = await btcChartRes.json();
        const global = await globalRes.json();

        const btcMarketCaps = btcChart.market_caps; // [timestamp, value]
        const globalMarketCap = global.data.total_market_cap.usd;
        const btcCurrentCap = global.data.market_cap_percentage.btc;

        const formattedLabels = btcMarketCaps.map(([ts]) => {
          const date = new Date(ts);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        });

        const dominancePoints = btcMarketCaps.map(([ts, btcCap]) => {
          // simulate dominance from total cap ~ assume ~ btcCap / (btcCap / btcDominance)
          const estimatedGlobalCap = btcCap / (btcCurrentCap / 100);
          return (btcCap / estimatedGlobalCap) * 100;
        });

        setLabels(formattedLabels);
        setDominanceHistory(dominancePoints);
        setCurrentDominance(btcCurrentCap);
      } catch (err) {
        console.error('Error fetching BTC dominance data:', err);
      }
    };

    fetchData();
  }, []);

  const lineData = {
    labels,
    datasets: [
      {
        label: 'BTC Dominance % (last 30 days)',
        data: dominanceHistory,
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 2,
      },
    ],
  };

  const doughnutData = {
    labels: ['BTC', 'Others'],
    datasets: [
      {
        data: [currentDominance, 100 - currentDominance],
        backgroundColor: ['#FFD700', '#444'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-10">
      <div className="w-full max-w-xl">
        <Line data={lineData} options={{
          responsive: true,
          plugins: {
            legend: {
              labels: { color: 'white' }
            }
          },
          scales: {
            x: { ticks: { color: 'white' } },
            y: { ticks: { color: 'white' }, beginAtZero: true },
          },
        }} />
      </div>
      <div className="w-full max-w-sm">
        <h3 className="text-center text-yellow-400 font-bold mb-4">BTC Dominance Now</h3>
        <Doughnut data={doughnutData} options={{
          plugins: {
            legend: {
              labels: { color: 'white' }
            }
          }
        }} />
      </div>
    </div>
  );
};

export default BtcDominanceChart;
