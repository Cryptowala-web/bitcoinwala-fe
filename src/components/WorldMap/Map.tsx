// import React, { useState, useEffect } from "react";

// interface Node {
//   id: string;
//   x: number;
//   y: number;
// }

// interface Connection {
//   id: string;
//   from: string;
//   to: string;
//   duration: number; // seconds
//   delay: number; // seconds
// }

// const nodes: Node[] = [
//   { id: "india", x: 550, y: 300 },
//   { id: "usa", x: 130, y: 200 },
//   { id: "europe", x: 790, y: 200 },
//   { id: "australia", x: 670, y: 370 },
//   { id: "japan", x: 770, y: 80 },
//   { id: "brazil", x: 280, y: 350 },
// ];

// const connections: Connection[] = [
//   { id: "c1", from: "india", to: "usa", duration: 3, delay: 0 },
//   { id: "c2", from: "india", to: "europe", duration: 2.5, delay: 0.5 },
//   { id: "c3", from: "india", to: "australia", duration: 3.5, delay: 1 },
//   { id: "c4", from: "india", to: "japan", duration: 2.8, delay: 1.5 },
//   { id: "c5", from: "india", to: "brazil", duration: 4, delay: 2 },
// ];

// const GlowingWorldMap = () => {
//   const [mounted, setMounted] = useState(false);
//    const [isHovered, setIsHovered] = useState(false);
//   useEffect(() => setMounted(true), []);

//   if (!mounted) return <div className="h-[500px] bg-black" />;

//   return (
//     <div className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden">
//       <svg
//         viewBox="0 0 1000 500"
//         className="w-full h-full"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
//             <feMerge>
//               <feMergeNode in="blur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* Background image */}
//         <image
//           href="world-map2.png"
//           x="0"
//           y="0"
//           width="1000"
//           height="500"
//           preserveAspectRatio="xMidYMid slice"
//           style={{
//           opacity: isHovered ? 1 : 0.4,
//           transition: "opacity 0.3s ease-in-out",
//           cursor: "pointer",
//           borderRadius:20
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         />

//         {connections.map((conn) => {
//           const fromNode = nodes.find((n) => n.id === conn.from);
//           const toNode = nodes.find((n) => n.id === conn.to);
//           if (!fromNode || !toNode) return null;

//           const controlX = (fromNode.x + toNode.x) / 2;
//           const controlY = Math.min(fromNode.y, toNode.y) - 80;

//           const pathId = `path-${conn.id}`;
//           const d = `M ${fromNode.x},${fromNode.y} Q ${controlX},${controlY} ${toNode.x},${toNode.y}`;

//           return (
//             <g key={conn.id}>
//               <path
//                 id={pathId}
//                 d={d}
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="1"
//                 opacity={0.6}
//               />
//               <circle r="4" fill="white" filter="url(#dotGlow)">
//                 <animateMotion
//                   dur={`${conn.duration}s`}
//                   begin={`${conn.delay}s`}
//                   repeatCount="indefinite"
//                 >
//                   <mpath href={`#${pathId}`} />
//                 </animateMotion>
//               </circle>
//             </g>
//           );
//         })}

//         {/* Node Dots */}
//         {nodes.map((node, idx) => (
//           <g key={node.id}>
//             <circle
//               cx={node.x}
//               cy={node.y}
//               r="5"
//               fill="white"
//               opacity={0.8}
//               filter="url(#dotGlow)"
//             />
//           </g>
//         ))}
//       </svg>
//     </div>
//   );
// };

// export default GlowingWorldMap;
import React, { useState, useEffect } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  duration: number; // seconds
  delay: number; // seconds
}

const nodes: Node[] = [
  { id: "india", x: 550, y: 300 },
  { id: "usa", x: 130, y: 200 },
  { id: "europe", x: 790, y: 200 },
  { id: "australia", x: 670, y: 370 },
  { id: "japan", x: 770, y: 80 },
  { id: "brazil", x: 280, y: 350 },
];

const connections: Connection[] = [
  { id: "c1", from: "india", to: "usa", duration: 3, delay: 0 },
  { id: "c2", from: "india", to: "europe", duration: 2.5, delay: 0.5 },
  { id: "c3", from: "india", to: "australia", duration: 3.5, delay: 1 },
  { id: "c4", from: "india", to: "japan", duration: 2.8, delay: 1.5 },
  { id: "c5", from: "india", to: "brazil", duration: 4, delay: 2 },
];

const GlowingWorldMap = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[500px] bg-black" />;

  return (
    <div className="relative w-full h-[500px] bg-black rounded-xl overflow-hidden">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for dots */}
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gradient mask for faded edges */}
          <radialGradient id="fadeMask" cx="60%" cy="50%" r="70%">
            <stop offset="60%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeEdgeMask">
            <rect x="0" y="0" width="1000" height="500" fill="url(#fadeMask)" />
          </mask>

          {/* Circular clip path to make the map round */}
          <clipPath id="circleClip">
            <circle cx="400" cy="250" r="550" />
          </clipPath>
        </defs>

        {/* Optional: Outer glowing ring */}
        <circle
          cx="600"
          cy="350"
          r="555"
          // stroke="white"
          opacity="0.2"
          fill="none"
          // strokeWidth="2"
        />

        {/* Wrap all graphic elements within the mask and clipPath */}
        <g mask="url(#fadeEdgeMask)" clipPath="url(#circleClip)">
          {/* Background image */}
          <image
            href="world-map2.png"
            x="0"
            y="0"
            width="1000"
            height="500"
            preserveAspectRatio="xMidYMid slice"
            style={{
              opacity: isHovered ? 1 : 0.4,
              transition: "opacity 0.3s ease-in-out",
              cursor: "pointer",
              borderRadius: 20,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Connection paths and traveling dots */}
          {connections.map((conn) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const controlX = (fromNode.x + toNode.x) / 2;
            const controlY = Math.min(fromNode.y, toNode.y) - 80;
            const pathId = `path-${conn.id}`;
            const d = `M ${fromNode.x},${fromNode.y} Q ${controlX},${controlY} ${toNode.x},${toNode.y}`;

            return (
              <g key={conn.id}>
                <path
                  id={pathId}
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  opacity={0.6}
                />
                <circle r="4" fill="white" filter="url(#dotGlow)">
                  <animateMotion
                    dur={`${conn.duration}s`}
                    begin={`${conn.delay}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          {/* Node Dots */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="5"
                fill="white"
                opacity={0.8}
                filter="url(#dotGlow)"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default GlowingWorldMap;
