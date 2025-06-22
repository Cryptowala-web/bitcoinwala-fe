// import React, { useState, useEffect, useRef } from "react";
// import {
//   Bitcoin,
//   TrendingUp,
//   Landmark,
//   Globe,
//   Zap,
//   DollarSign,
// } from "lucide-react";
// import throttle from "lodash/throttle";
// import "./graph3.css";

// const BitcoinTimelineGraph = () => {
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [bubbles, setBubbles] = useState([]);
//   const [nodePositions, setNodePositions] = useState([]);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const dragIndexRef = useRef(null);
//   const isPanningRef = useRef(false);
//   const detailsTimeoutRef = useRef(null);

//   const timelineData = [
//     {
//       year: "2008",
//       event: "Satoshi Nakamoto published Bitcoin whitepaper",
//       icon: Bitcoin,
//       color: "black",
//     },
//     {
//       year: "2009",
//       event: "Bitcoin network created, 1st Bitcoin was mined",
//       icon: Zap,
//       color: "black",
//     },
//     {
//       year: "2010",
//       event:
//         "2 Pizzas bought in exchange of 10,000 BTC, 1st commercial transaction",
//       icon: DollarSign,
//       color: "black",
//     },
//     {
//       year: "2011",
//       event: "Bitcoin reached $1, Bitcoin accepted as payment",
//       icon: TrendingUp,
//       color: "black",
//     },
//     {
//       year: "2012",
//       event: "Founded Bitcoin Foundation, 1st BTC halving",
//       icon: Landmark,
//       color: "black",
//     },
//     {
//       year: "2013",
//       event: "Bitcoin reached $100, 1st BTC ATM in Canada",
//       icon: TrendingUp,
//       color: "black",
//     },
//     {
//       year: "2014",
//       event: "Bitcoin XT launched by Mike Hearn",
//       icon: Bitcoin,
//       color: "black",
//     },
//     {
//       year: "2015",
//       event:
//         "Over 100,000 merchants accepted Bitcoin, 1st Bitcoin ETF launched by the Winklevoss twins",
//       icon: Globe,
//       color: "black",
//     },
//     {
//       year: "2016",
//       event:
//         "2nd Bitcoin halving, BTC reward 12.5, Over 780 BTC ATMs worldwide",
//       icon: Zap,
//       color: "black",
//     },
//     {
//       year: "2017",
//       event:
//         "Bitcoin spectacular run from $1000 to $20000, Bitcoin Cash fork produced",
//       icon: TrendingUp,
//       color: "black",
//     },
//     {
//       year: "2018",
//       event: "Bitcoin dropped from $10000 to $3200",
//       icon: TrendingUp,
//       color: "black",
//     },
//     {
//       year: "2019",
//       event: "BTC dominance rate reached 70%",
//       icon: Bitcoin,
//       color: "black",
//     },
//     {
//       year: "2020",
//       event: "BTC high $30000, 3rd halving event, BTC reward 6.25",
//       icon: Zap,
//       color: "black",
//     },
//     {
//       year: "2021",
//       event: "El Salvador becomes 1st Nation to declare BTC as legal tender",
//       icon: Landmark,
//       color: "black",
//     },
//     {
//       year: "2022",
//       event: "Central African Republic adopted BTC as legal tender",
//       icon: Globe,
//       color: "black",
//     },
//     {
//       year: "2023",
//       event: "Bitcoin ETF approval, Bitcoin rises to $42000",
//       icon: TrendingUp,
//       color: "black",
//     },
//     {
//       year: "2024",
//       event:
//         "BTC 4th halving event, BTC reward 3.125, Bitcoin record high of $73000",
//       icon: Zap,
//       color: "black",
//     },
//   ];

//   useEffect(() => {
//     const positions = timelineData.map((item, index) => {
//       const angle = (index / timelineData.length) * 4 * Math.PI;
//       const radius = 180 + index * 12;
//       return {
//         ...item,
//         x: 450 + Math.cos(angle) * radius,
//         y: 350 + Math.sin(angle) * radius,
//         id: item.year,
//       };
//     });
//     setNodePositions(positions);
//   }, []);

//   const startDetailsTimeout = () => {
//     if (detailsTimeoutRef.current) clearTimeout(detailsTimeoutRef.current);
//     detailsTimeoutRef.current = setTimeout(() => setSelectedNode(null), 1200);
//   };

//   const handleNodeClick = (node) => {
//     setSelectedNode(node);
//     startDetailsTimeout();
//     const newBubbles = Array.from({ length: 50 }, (_, i) => ({
//       id: `${Date.now()}-${i}`,
//       x: node.x + (Math.random() - 0.5) * 100,
//       y: node.y + (Math.random() - 0.5) * 100,
//       size: Math.random() * 25 + 10,
//       color: "gray",
//       opacity: Math.random() * 0.7 + 0.3,
//     }));
//     setBubbles(newBubbles);
//     setTimeout(() => setBubbles([]), 700);
//   };

//   const handleNodeHover = (node) => {
//     setSelectedNode(node);
//     startDetailsTimeout();
//     const hoverBubbles = Array.from({ length: 5 }, (_, i) => ({
//       id: `${Date.now()}-hover-${i}`,
//       x: node.x + (Math.random() - 0.5) * 50,
//       y: node.y + (Math.random() - 0.5) * 50,
//       size: Math.random() * 15 + 5,
//       color: node.color,
//       opacity: Math.random() * 0.5 + 0.3,
//     }));
//     setBubbles((prev) => [...prev, ...hoverBubbles]);
//     setTimeout(
//       () => setBubbles((prev) => prev.filter((b) => !b.id.includes("hover"))),
//       700
//     );
//   };

//   const handleDrag = useRef(
//     throttle((index, clientX, clientY) => {
//       setNodePositions((prev) =>
//         prev.map((node, i) =>
//           i === index
//             ? { ...node, x: clientX - offset.x, y: clientY - offset.y }
//             : node
//         )
//       );
//     }, 16)
//   ).current;

//   const startNodeDrag = (e, index) => {
//     e.preventDefault();
//     dragIndexRef.current = index;
//     const node = nodePositions[index];
//     const startX = e.clientX - node.x - offset.x;
//     const startY = e.clientY - node.y - offset.y;

//     const handleMouseMove = (moveEvent) => {
//       handleDrag(index, moveEvent.clientX - startX, moveEvent.clientY - startY);
//     };

//     const handleMouseUp = () => {
//       dragIndexRef.current = null;
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const startGraphPan = (e) => {
//     if (e.target !== e.currentTarget) return;
//     e.preventDefault();
//     isPanningRef.current = true;
//     const startX = e.clientX - offset.x;
//     const startY = e.clientY - offset.y;

//     const handleMouseMove = (moveEvent) => {
//       setOffset({
//         x: moveEvent.clientX - startX,
//         y: moveEvent.clientY - startY,
//       });
//     };

//     const handleMouseUp = () => {
//       isPanningRef.current = false;
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <div style={{
//       fontFamily: '"Orbitron", sans-serif',
//       letterSpacing: '0.2em',
//       color:"white"
//     }}>
//       <header className="pt-10 px-6 left-6 z-30 text-white flex items-center justify-center bg-black">
//         <div>
//           <h1 className="text-4xl font-bold flex items-center gap-3 mb-2 animate-header">
//             <div className="relative h-20 w-20 group">
//               <img
//                 src="bitlogo.png"
//                 alt="Bitcoin Logo"
//                 className="absolute inset-0 h-25 w-25 object-contain transition-opacity duration-300 group-hover:opacity-0"
//               />
//               <img
//                 src="bitlogo-hover.png"
//                 alt="Bitcoin Hover Logo"
//                 className="absolute inset-0 h-25 w-25 object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//               />
//             </div>
//             Bitcoin Evolution Timeline
//           </h1>

//           <p className="text-gray-300 text-sm">
//             Hover or click ,Drag nodes to explore Bitcoin's journey
//           </p>
//         </div>
//       </header>

//       <div
//         className="flex items-center justify-center  align-center h-screen pt-40 bg-red relative overflow-hidden  "
//         onMouseDown={startGraphPan}
//       >

//         <div className="absolute inset-0 pointer-events-none">
//           {Array.from({ length: 60 }, (_, i) => (
//             <div
//               key={`particle-${i}`}
//               className="absolute rounded-full bg-white/20 animate-particle"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: `${Math.random() * 3 + 1}px`,
//                 height: `${Math.random() * 3 + 1}px`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${3 + Math.random() * 4}s`,
//               }}
//             />
//           ))}
//         </div>

//         <div
//           className="relative w-1/2 h-full flex  "
//           style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
//         >
//           <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
//             <defs>
//               <linearGradient
//                 id="connectionGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="100%"
//               >
//                 <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
//                 <stop offset="25%" stopColor="#10b981" stopOpacity="0.6" />
//                 <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
//                 <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
//               </linearGradient>
//             </defs>
//             {nodePositions.length > 1 &&
//               nodePositions.slice(0, -1).map((node, index) => {
//                 const nextNode = nodePositions[index + 1];
//                 const isHighlighted =
//                   selectedNode &&
//                   (selectedNode.year === node.year ||
//                     selectedNode.year === nextNode.year);
//                 return (
//                   <line
//                     key={`connection-${index}`}
//                     x1={node.x}
//                     y1={node.y}
//                     x2={nextNode.x}
//                     y2={nextNode.y}
//                     stroke="url(#connectionGradient)"
//                     strokeWidth="3"
//                     opacity={isHighlighted ? "1" : "0.8"}
//                     className={isHighlighted ? "animate-line" : ""}
//                   />
//                 );
//               })}
//           </svg>

//           {nodePositions.map((node, index) => {
//             const Icon = node.icon;
//             const isSelected = selectedNode?.year === node.year;
//             return (
//               <div
//                 key={node.year}
//                 className="animate-node"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div
//                   className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-20 node-container ${isSelected ? "scale-125" : ""
//                     }`}
//                   style={{ left: node.x, top: node.y }}
//                   onClick={() => handleNodeClick(node)}
//                   onMouseEnter={() => handleNodeHover(node)}
//                   onMouseDown={(e) => startNodeDrag(e, index)}
//                 >
//                   <div className="absolute rounded-full node-ripple z-0" />
//                   {isSelected && (
//                     <div
//                       className="absolute rounded-full animate-ping z-0"
//                       style={{
//                         backgroundColor: node.color,
//                         width: "70px",
//                         height: "70px",
//                         opacity: 0.4,
//                         left: "50%",
//                         top: "50%",
//                         transform: "translate(-50%, -50%)",
//                       }}
//                     />
//                   )}
//                   <div
//                     className="relative w-14 h-14 rounded-full border-3 border-white flex items-center justify-center shadow-2xl z-10 node-pulse"
//                     style={{
//                       backgroundColor: node.color,
//                       boxShadow: isSelected
//                         ? `0 0 30px ${node.color}, 0 0 60px ${node.color}40`
//                         : "0 8px 25px rgba(0,0,0,0.4)",
//                     }}
//                   >
//                     <Icon className="text-white" size={24} />
//                   </div>
//                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
//                     <span className="text-white font-bold text-sm bg-black/70 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
//                       {node.year}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {bubbles.map((bubble) => (
//             <div
//               key={bubble.id}
//               className="absolute rounded-full pointer-events-none animate-bubble"
//               style={{
//                 left: bubble.x - bubble.size / 2,
//                 top: bubble.y - bubble.size / 2,
//                 width: bubble.size,
//                 height: bubble.size,
//                 backgroundColor: bubble.color,
//                 opacity: bubble.opacity,
//               }}
//             />
//           ))}
//         </div>
//         {selectedNode && (
//           <div className="fixed bottom-20 left-6 right-6 bg-black/60 w-1/2 backdrop-blur-xl rounded-2xl p-6 border border-white/10 z-40 animate-details shadow-2xl">
//             <div className="flex items-start gap-6">
//               <div
//                 className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-icon"
//                 style={{ backgroundColor: selectedNode.color }}
//               >
//                 <selectedNode.icon className="text-white" size={36} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
//                   {selectedNode.year}
//                   <span
//                     className="px-3 py-1 rounded-full text-sm font-medium"
//                     style={{
//                       backgroundColor: `${selectedNode.color}20`,
//                       color: selectedNode.color,
//                     }}
//                   >
//                     Milestone
//                   </span>
//                 </h3>
//                 <p className="text-gray-200 text-lg leading-relaxed font-medium">
//                   {selectedNode.event}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedNode(null)}
//                 className="text-white/60 hover:text-white transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 flex-shrink-0"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BitcoinTimelineGraph;

// // // Updated BitcoinTimelineGraph.jsx
// // import React, { useState, useEffect, useRef } from 'react';
// // import { Bitcoin, TrendingUp, Landmark, Globe, Zap, DollarSign } from 'lucide-react';
// // import throttle from 'lodash/throttle';
// // import './graph3.css';

// // const BitcoinTimelineGraph = () => {
// //   const [selectedNode, setSelectedNode] = useState(null);
// //   const [bubbles, setBubbles] = useState([]);
// //   const [nodePositions, setNodePositions] = useState([]);
// //   const [offset, setOffset] = useState({ x: 0, y: 0 });
// //   const dragIndexRef = useRef(null);
// //   const isPanningRef = useRef(false);
// //   const detailsTimeoutRef = useRef(null);

// //   const timelineData = [
// //     { year: "2008", event: "Satoshi Nakamoto published Bitcoin whitepaper", icon: Bitcoin },
// //     { year: "2009", event: "Bitcoin network created, 1st Bitcoin was mined", icon: Zap },
// //     { year: "2010", event: "2 Pizzas bought for 10,000 BTC", icon: DollarSign },
// //     { year: "2011", event: "Bitcoin reached $1", icon: TrendingUp },
// //     { year: "2012", event: "Founded Bitcoin Foundation", icon: Landmark },
// //     { year: "2013", event: "Bitcoin reached $100", icon: TrendingUp },
// //     { year: "2014", event: "Bitcoin XT launched", icon: Bitcoin },
// //     { year: "2015", event: "1st Bitcoin ETF launched", icon: Globe },
// //     { year: "2016", event: "2nd BTC halving", icon: Zap },
// //     { year: "2017", event: "BTC rose to $20,000", icon: TrendingUp },
// //     { year: "2018", event: "Bitcoin dropped to $3,200", icon: TrendingUp },
// //     { year: "2019", event: "BTC dominance 70%", icon: Bitcoin },
// //     { year: "2020", event: "BTC hit $30,000", icon: Zap },
// //     { year: "2021", event: "El Salvador legal tender", icon: Landmark },
// //     { year: "2022", event: "Central African Republic adopted BTC", icon: Globe },
// //     { year: "2023", event: "Bitcoin ETF approval", icon: TrendingUp },
// //     { year: "2024", event: "4th halving, BTC hits $73,000", icon: Zap },
// //   ];

// //   useEffect(() => {
// //     const positions = timelineData.map((item, index) => {
// //       const angle = (index / timelineData.length) * 4 * Math.PI;
// //       const radius = 180 + (index * 12);
// //       return {
// //         ...item,
// //         x: 450 + Math.cos(angle) * radius,
// //         y: 350 + Math.sin(angle) * radius,
// //         id: item.year,
// //         color: 'rgba(255,255,255,0.1)', // Blackish glassy color
// //       };
// //     });
// //     setNodePositions(positions);
// //   }, []);

// //   const startDetailsTimeout = () => {
// //     if (detailsTimeoutRef.current) clearTimeout(detailsTimeoutRef.current);
// //     detailsTimeoutRef.current = setTimeout(() => setSelectedNode(null), 1200);
// //   };

// //   const handleNodeClick = (node) => {
// //     setSelectedNode(node);
// //     startDetailsTimeout();
// //     const newBubbles = Array.from({ length: 10 }, (_, i) => ({
// //       id: `${Date.now()}-${i}`,
// //       x: node.x + (Math.random() - 0.5) * 100,
// //       y: node.y + (Math.random() - 0.5) * 100,
// //       size: Math.random() * 25 + 10,
// //       color: node.color,
// //       opacity: Math.random() * 0.7 + 0.3
// //     }));
// //     setBubbles(newBubbles);
// //     setTimeout(() => setBubbles([]), 700);
// //   };

// //   const handleNodeHover = (node) => {
// //     setSelectedNode(node);
// //     startDetailsTimeout();
// //     const hoverBubbles = Array.from({ length: 5 }, (_, i) => ({
// //       id: `${Date.now()}-hover-${i}`,
// //       x: node.x + (Math.random() - 0.5) * 50,
// //       y: node.y + (Math.random() - 0.5) * 50,
// //       size: Math.random() * 15 + 5,
// //       color: node.color,
// //       opacity: Math.random() * 0.5 + 0.3
// //     }));
// //     setBubbles((prev) => [...prev, ...hoverBubbles]);
// //     setTimeout(() => setBubbles((prev) => prev.filter((b) => !b.id.includes("hover"))), 700);
// //   };

// //   const handleDrag = useRef(throttle((index, clientX, clientY) => {
// //     setNodePositions((prev) =>
// //       prev.map((node, i) =>
// //         i === index ? { ...node, x: clientX - offset.x, y: clientY - offset.y } : node
// //       )
// //     );
// //   }, 16)).current;

// //   const startNodeDrag = (e, index) => {
// //     e.preventDefault();
// //     dragIndexRef.current = index;
// //     const node = nodePositions[index];
// //     const startX = e.clientX - node.x - offset.x;
// //     const startY = e.clientY - node.y - offset.y;

// //     const handleMouseMove = (moveEvent) => {
// //       handleDrag(index, moveEvent.clientX - startX, moveEvent.clientY - startY);
// //     };

// //     const handleMouseUp = () => {
// //       dragIndexRef.current = null;
// //       document.removeEventListener("mousemove", handleMouseMove);
// //       document.removeEventListener("mouseup", handleMouseUp);
// //     };

// //     document.addEventListener("mousemove", handleMouseMove);
// //     document.addEventListener("mouseup", handleMouseUp);
// //   };

// //   const startGraphPan = (e) => {
// //     if (e.target !== e.currentTarget) return;
// //     e.preventDefault();
// //     isPanningRef.current = true;
// //     const startX = e.clientX - offset.x;
// //     const startY = e.clientY - offset.y;

// //     const handleMouseMove = (moveEvent) => {
// //       setOffset({ x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
// //     };

// //     const handleMouseUp = () => {
// //       isPanningRef.current = false;
// //       document.removeEventListener("mousemove", handleMouseMove);
// //       document.removeEventListener("mouseup", handleMouseUp);
// //     };

// //     document.addEventListener("mousemove", handleMouseMove);
// //     document.addEventListener("mouseup", handleMouseUp);
// //   };

// //   return (
// //     <div className="min-h-screen bg-black">
// //       <header className="pt-20 px-6 z-30 text-white flex items-center justify-center bg-black">
// //         <div>
// //           <h1 className="text-4xl font-bold flex items-center gap-3 mb-4 animate-header">
// //             <img src="bitlogo.png" className="h-16 w-16 object-contain" alt="Bitcoin Logo" />
// //             Bitcoin Evolution Timeline
// //           </h1>
// //           <p className="text-gray-400 text-sm">* Hover or click, Drag nodes to explore Bitcoin's journey</p>
// //         </div>
// //       </header>

// //       <div
// //         className="w-full h-[calc(100vh-150px)] relative overflow-hidden flex items-center justify-center bg-black"
// //         onMouseDown={startGraphPan}
// //       >
// //         <div className="relative w-full h-full" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
// //           {nodePositions.map((node, index) => {
// //             const Icon = node.icon;
// //             const isSelected = selectedNode?.year === node.year;
// //             return (
// //               <div
// //                 key={node.year}
// //                 className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
// //                 style={{ left: node.x, top: node.y }}
// //                 onClick={() => handleNodeClick(node)}
// //                 onMouseEnter={() => handleNodeHover(node)}
// //                 onMouseDown={(e) => startNodeDrag(e, index)}
// //               >
// //                 <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-white/20 ${isSelected ? 'scale-110' : ''}`} style={{ backgroundColor: node.color }}>
// //                   <Icon className="text-white" size={20} />
// //                 </div>
// //               </div>
// //             );
// //           })}

// //           {bubbles.map((bubble) => (
// //             <div
// //               key={bubble.id}
// //               className="absolute rounded-full pointer-events-none animate-bubble"
// //               style={{
// //                 left: bubble.x - bubble.size / 2,
// //                 top: bubble.y - bubble.size / 2,
// //                 width: bubble.size,
// //                 height: bubble.size,
// //                 backgroundColor: bubble.color,
// //                 opacity: bubble.opacity,
// //               }}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BitcoinTimelineGraph;

import React, { useState, useEffect, useRef } from "react";
import {
  Bitcoin,
  TrendingUp,
  Landmark,
  Globe,
  Zap,
  DollarSign,
} from "lucide-react";
import throttle from "lodash/throttle";
import "./graph3.css";

const BitcoinTimelineGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [nodePositions, setNodePositions] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const dragIndexRef = useRef(null);
  const isPanningRef = useRef(false);
  const containerRef = useRef(null);
  const detailsTimeoutRef = useRef(null);

  const timelineData = [
    {
      year: "2008",
      event: "Satoshi Nakamoto published Bitcoin whitepaper",
      icon: Bitcoin,
      color: "black",
    },
    {
      year: "2009",
      event: "Bitcoin network created, 1st Bitcoin was mined",
      icon: Zap,
      color: "black",
    },
    {
      year: "2010",
      event: "2 Pizzas bought for 10,000 BTC",
      icon: DollarSign,
      color: "black",
    },
    {
      year: "2011",
      event: "Bitcoin reached $1",
      icon: TrendingUp,
      color: "black",
    },
    {
      year: "2012",
      event: "Bitcoin Foundation founded",
      icon: Landmark,
      color: "black",
    },
    {
      year: "2013",
      event: "Bitcoin reached $100",
      icon: TrendingUp,
      color: "black",
    },
    {
      year: "2014",
      event: "Bitcoin XT launched",
      icon: Bitcoin,
      color: "black",
    },
    {
      year: "2015",
      event: "1st Bitcoin ETF launched",
      icon: Globe,
      color: "black",
    },
    { year: "2016", event: "2nd BTC halving", icon: Zap, color: "black" },
    {
      year: "2017",
      event: "BTC rose to $20,000",
      icon: TrendingUp,
      color: "black",
    },
    {
      year: "2018",
      event: "Bitcoin dropped to $3,200",
      icon: TrendingUp,
      color: "black",
    },
    { year: "2019", event: "BTC dominance 70%", icon: Bitcoin, color: "black" },
    { year: "2020", event: "BTC hit $30,000", icon: Zap, color: "black" },
    {
      year: "2021",
      event: "El Salvador made BTC legal",
      icon: Landmark,
      color: "black",
    },
    { year: "2022", event: "CAR adopted BTC", icon: Globe, color: "black" },
    {
      year: "2023",
      event: "Bitcoin ETF approval",
      icon: TrendingUp,
      color: "black",
    },
    {
      year: "2024",
      event: "4th halving, BTC hit $73k",
      icon: Zap,
      color: "black",
    },
  ];

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;
    const positions = timelineData.map((item, index) => {
      const angle = (index / timelineData.length) * 4 * Math.PI;
      const radius = 180 + index * 12;
      return {
        ...item,
        x: containerSize.width / 2 + Math.cos(angle) * radius,
        y: containerSize.height / 2 + Math.sin(angle) * radius,
        id: item.year,
      };
    });
    setNodePositions(positions);
  }, [containerSize]);

  const startDetailsTimeout = () => {
    if (detailsTimeoutRef.current) clearTimeout(detailsTimeoutRef.current);
    detailsTimeoutRef.current = setTimeout(() => setSelectedNode(null), 1200);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    startDetailsTimeout();
    const newBubbles = Array.from({ length: 50 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: node.x + (Math.random() - 0.5) * 100,
      y: node.y + (Math.random() - 0.5) * 100,
      size: Math.random() * 25 + 10,
      color: "gray",
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setBubbles(newBubbles);
    setTimeout(() => setBubbles([]), 700);
  };

  const handleNodeHover = (node) => {
    setSelectedNode(node);
    startDetailsTimeout();
    const hoverBubbles = Array.from({ length: 5 }, (_, i) => ({
      id: `${Date.now()}-hover-${i}`,
      x: node.x + (Math.random() - 0.5) * 50,
      y: node.y + (Math.random() - 0.5) * 50,
      size: Math.random() * 15 + 5,
      color: node.color,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setBubbles((prev) => [...prev, ...hoverBubbles]);
    setTimeout(
      () => setBubbles((prev) => prev.filter((b) => !b.id.includes("hover"))),
      700
    );
  };

  const handleDrag = useRef(
    throttle((index, clientX, clientY) => {
      setNodePositions((prev) =>
        prev.map((node, i) =>
          i === index
            ? { ...node, x: clientX - offset.x, y: clientY - offset.y }
            : node
        )
      );
    }, 16)
  ).current;

  const startNodeDrag = (e, index) => {
    e.preventDefault();
    dragIndexRef.current = index;
    const node = nodePositions[index];
    const startX = e.clientX - node.x - offset.x;
    const startY = e.clientY - node.y - offset.y;

    const handleMouseMove = (moveEvent) => {
      handleDrag(index, moveEvent.clientX - startX, moveEvent.clientY - startY);
    };

    const handleMouseUp = () => {
      dragIndexRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const startGraphPan = (e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    isPanningRef.current = true;
    const startX = e.clientX - offset.x;
    const startY = e.clientY - offset.y;

    const handleMouseMove = (moveEvent) => {
      setOffset({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      isPanningRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "Orbitron, sans-serif", letterSpacing: "0.1em" }}
    >
      <header className="pt-10 px-6 z-30 text-white text-center">
        <h1 className="text-4xl font-bold">Bitcoin Evolution Timeline</h1>
        <p className="text-gray-400 text-sm mt-2">
          Click or hover nodes. Drag to explore.
        </p>
      </header>

      <div
        ref={containerRef}
        onMouseDown={startGraphPan}
        className="relative w-full h-[calc(100vh-100px)] mt-20 overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <svg className="absolute w-full h-full z-10 pointer-events-none">
            <defs>
              <linearGradient
                id="connectionGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="25%" stopColor="#10b981" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {nodePositions.map((node, idx) => {
              const next = nodePositions[idx + 1];
              if (!next) return null;
              const isHighlighted =
                selectedNode &&
                (selectedNode.year === node.year ||
                  selectedNode.year === next.year);
              return (
                <line
                  key={idx}
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth={isHighlighted ? 4 : 2}
                  opacity={isHighlighted ? 1 : 0.5}
                />
              );
            })}
          </svg>

          {nodePositions.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNode?.year === node.year;
            return (
              <div
                key={node.year}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
                  isSelected ? "scale-125" : ""
                }`}
                style={{ left: node.x, top: node.y }}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => handleNodeHover(node)}
                onMouseDown={(e) => startNodeDrag(e, index)}
              >
                <div className="relative w-14 h-14 rounded-full border-2 border-white flex items-center justify-center shadow-lg bg-black">
                  <Icon className="text-white" size={24} />
                </div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  {node.year}
                </div>
              </div>
            );
          })}

          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute rounded-full pointer-events-none animate-pulse"
              style={{
                left: bubble.x - bubble.size / 2,
                top: bubble.y - bubble.size / 2,
                width: bubble.size,
                height: bubble.size,
                backgroundColor: bubble.color,
                opacity: bubble.opacity,
              }}
            />
          ))}

          {selectedNode && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 w-[95%] sm:w-4/5 md:w-2/3 lg:w-1/2 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 z-40 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  <selectedNode.icon className="text-white" size={28} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {selectedNode.year}
                  </h3>
                  <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium">
                    {selectedNode.event}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="self-end sm:self-start text-white/60 hover:text-white transition-colors text-xl sm:text-2xl font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BitcoinTimelineGraph;
