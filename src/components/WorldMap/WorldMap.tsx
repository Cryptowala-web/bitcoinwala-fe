import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  path: string;
  duration: number;
  delay: number;
}

export const GlobalNetwork = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // const nodes: Node[] = [
  //   { id: "nyc", x: 240, y: 180, label: "New York" },
  //   { id: "london", x: 500, y: 160, label: "London" },
  //   { id: "tokyo", x: 850, y: 200, label: "Tokyo" },
  //   { id: "sydney", x: 880, y: 380, label: "Sydney" },
  //   { id: "singapore", x: 720, y: 280, label: "Singapore" },
  //   { id: "mumbai", x: 650, y: 240, label: "Mumbai" },
  //   { id: "saopaulo", x: 320, y: 350, label: "São Paulo" },
  //   { id: "capetown", x: 520, y: 420, label: "Cape Town" },
  // ];

  // // Curved connections between nodes
  // const connections: Connection[] = [
  //   {
  //     id: "nyc-london",
  //     from: "nyc",
  //     to: "london",
  //     path: "M 160 10 Q 320 120 500 160",
  //     duration: 3,
  //     delay: 0,
  //   },
  //   {
  //     id: "london-tokyo",
  //     from: "london",
  //     to: "tokyo",
  //     path: "M 500 160 Q 675 100 850 200",
  //     duration: 4,
  //     delay: 0.5,
  //   },
  //   {
  //     id: "tokyo-sydney",
  //     from: "tokyo",
  //     to: "sydney",
  //     path: "M 850 200 Q 900 290 880 380",
  //     duration: 3.5,
  //     delay: 1,
  //   },
  //   {
  //     id: "singapore-mumbai",
  //     from: "singapore",
  //     to: "mumbai",
  //     path: "M 720 280 Q 685 250 650 240",
  //     duration: 2.5,
  //     delay: 1.5,
  //   },
  //   {
  //     id: "mumbai-london",
  //     from: "mumbai",
  //     to: "london",
  //     path: "M 650 240 Q 575 180 500 160",
  //     duration: 3,
  //     delay: 2,
  //   },
  //   {
  //     id: "nyc-saopaulo",
  //     from: "nyc",
  //     to: "saopaulo",
  //     path: "M 240 180 Q 220 265 320 350",
  //     duration: 3.5,
  //     delay: 2.5,
  //   },
  //   {
  //     id: "london-capetown",
  //     from: "london",
  //     to: "capetown",
  //     path: "M 500 160 Q 480 290 520 420",
  //     duration: 4,
  //     delay: 3,
  //   },
  //   {
  //     id: "singapore-sydney",
  //     from: "singapore",
  //     to: "sydney",
  //     path: "M 720 280 Q 800 330 880 380",
  //     duration: 3,
  //     delay: 3.5,
  //   },
  // ];

  // Simplified world map paths (continents outline)
const nodes: Node[] = [
  { id: "nyc", x: 170, y: 150, label: "New York" },
  { id: "london", x: 370, y: 130, label: "London" },
  { id: "tokyo", x: 860, y: 180, label: "Tokyo" },
  { id: "sydney", x: 960, y: 360, label: "Sydney" },
  { id: "singapore", x: 780, y: 300, label: "Singapore" },
  { id: "mumbai", x: 710, y: 240, label: "Mumbai" },
  { id: "saopaulo", x: 230, y: 350, label: "São Paulo" },
  { id: "capetown", x: 450, y: 430, label: "Cape Town" },
];
const connections: Connection[] = [
  {
    id: "nyc-london",
    from: "nyc",
    to: "london",
    path: "M 170 150 Q 270 140 370 130",
    duration: 3,
    delay: 0,
  },
  {
    id: "london-tokyo",
    from: "london",
    to: "tokyo",
    path: "M 370 130 Q 615 100 860 180",
    duration: 4,
    delay: 0.5,
  },
  {
    id: "tokyo-sydney",
    from: "tokyo",
    to: "sydney",
    path: "M 860 180 Q 930 270 960 360",
    duration: 3.5,
    delay: 1,
  },
  {
    id: "singapore-mumbai",
    from: "singapore",
    to: "mumbai",
    path: "M 780 300 Q 745 270 710 240",
    duration: 2.5,
    delay: 1.5,
  },
  {
    id: "mumbai-london",
    from: "mumbai",
    to: "london",
    path: "M 710 240 Q 540 180 370 130",
    duration: 3,
    delay: 2,
  },
  {
    id: "nyc-saopaulo",
    from: "nyc",
    to: "saopaulo",
    path: "M 170 150 Q 140 230 230 350",
    duration: 3.5,
    delay: 2.5,
  },
  {
    id: "london-capetown",
    from: "london",
    to: "capetown",
    path: "M 370 130 Q 410 280 450 430",
    duration: 4,
    delay: 3,
  },
  {
    id: "singapore-sydney",
    from: "singapore",
    to: "sydney",
    path: "M 780 300 Q 870 330 960 360",
    duration: 3,
    delay: 3.5,
  },
];


// const connections: Connection[] = [
//   {
//     id: "nyc-london",
//     from: "nyc",
//     to: "london",
//     path: "M 310 150 Q 420 140 520 130",
//     duration: 3,
//     delay: 0,
//   },
//   {
//     id: "london-tokyo",
//     from: "london",
//     to: "tokyo",
//     path: "M 520 130 Q 765 100 1010 180",
//     duration: 4,
//     delay: 0.5,
//   },
//   {
//     id: "tokyo-sydney",
//     from: "tokyo",
//     to: "sydney",
//     path: "M 1010 180 Q 1080 270 1110 360",
//     duration: 3.5,
//     delay: 1,
//   },
//   {
//     id: "singapore-mumbai",
//     from: "singapore",
//     to: "mumbai",
//     path: "M 930 300 Q 895 270 860 240",
//     duration: 2.5,
//     delay: 1.5,
//   },
//   {
//     id: "mumbai-london",
//     from: "mumbai",
//     to: "london",
//     path: "M 860 240 Q 690 180 520 130",
//     duration: 3,
//     delay: 2,
//   },
//   {
//     id: "nyc-saopaulo",
//     from: "nyc",
//     to: "saopaulo",
//     path: "M 310 150 Q 290 260 380 370",
//     duration: 3.5,
//     delay: 2.5,
//   },
//   {
//     id: "london-capetown",
//     from: "london",
//     to: "capetown",
//     path: "M 520 130 Q 560 280 600 430",
//     duration: 4,
//     delay: 3,
//   },
//   {
//     id: "singapore-sydney",
//     from: "singapore",
//     to: "sydney",
//     path: "M 930 300 Q 1020 330 1110 360",
//     duration: 3,
//     delay: 3.5,
//   },
// ];

  const worldMapPath = `
    M 150 120 Q 200 100 280 120 Q 350 110 420 130 Q 480 140 520 150 Q 580 160 640 170 Q 700 180 760 190 Q 820 200 880 220 Q 920 240 950 280
    M 120 160 Q 180 150 240 160 Q 300 170 360 180 Q 420 190 480 200 Q 540 210 600 220 Q 660 230 720 240 Q 780 250 840 260 Q 900 270 960 300
    M 100 200 Q 160 190 220 200 Q 280 210 340 220 Q 400 230 460 240 Q 520 250 580 260 Q 640 270 700 280 Q 760 290 820 300 Q 880 310 940 340
    M 140 260 Q 200 250 260 260 Q 320 270 380 280 Q 440 290 500 300 Q 560 310 620 320 Q 680 330 740 340 Q 800 350 860 360 Q 920 370 980 400
    M 180 320 Q 240 310 300 320 Q 360 330 420 340 Q 480 350 540 360 Q 600 370 660 380 Q 720 390 780 400 Q 840 410 900 420 Q 960 430 1000 460
    M 220 380 Q 280 370 340 380 Q 400 390 460 400 Q 520 410 580 420 Q 640 430 700 440 Q 760 450 820 460 Q 880 470 940 480
    M 200 440 Q 260 430 320 440 Q 380 450 440 460 Q 500 470 560 480 Q 620 490 680 500 Q 740 510 800 520 Q 860 530 920 540
  `;

  if (!mounted) {
    return <div className="min-h-screen bg-background animate-fade-in" />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            // backgroundImage: `
            //      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            //      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            //    `,
            // backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Global Network
          </h1>
          <p className="text-muted-foreground text-lg">
            Real-time data flow across the world
          </p>
        </div>

        {/* Network Visualization */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-6xl h-96 md:h-[600px] bg-black/50 rounded-2xl backdrop-blur-sm overflow-hidden">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              // style={{
              //   filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))",
              // }}
            >
              {/* World Map Background */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="dotGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* World Map Background - More prominent */}
              {/* <g
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
                fill="rgba(255,255,255,0.02)"
              > */}
              {/* North America */}
              {/* <path
                  d="M 50 80 Q 120 60 200 80 Q 280 100 350 120 Q 380 140 400 180 Q 380 220 350 240 Q 300 250 250 240 Q 200 230 150 220 Q 100 200 80 160 Q 60 120 50 80 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s" }}
                /> */}

              {/* South America */}
              {/* <path
                  d="M 250 260 Q 300 250 350 270 Q 380 300 390 350 Q 380 400 360 440 Q 320 460 280 450 Q 240 440 220 400 Q 210 360 220 320 Q 230 290 250 260 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                /> */}

              {/* Europe */}
              {/* <path
                  d="M 450 120 Q 500 110 550 120 Q 580 140 590 170 Q 580 200 560 220 Q 520 230 480 220 Q 450 200 440 170 Q 430 140 450 120 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "1s" }}
                /> */}

              {/* Africa */}
              {/* <path
                  d="M 480 240 Q 520 230 560 250 Q 580 280 590 320 Q 580 360 570 400 Q 550 440 520 460 Q 480 470 450 450 Q 430 420 440 380 Q 450 340 460 300 Q 470 270 480 240 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "1.5s" }}
                /> */}

              {/* Asia */}
              {/* <path
                  d="M 600 100 Q 700 90 800 110 Q 900 130 950 160 Q 980 200 970 240 Q 950 280 920 300 Q 880 320 840 310 Q 800 300 760 280 Q 720 260 680 240 Q 640 220 620 180 Q 600 140 600 100 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "2s" }}
                /> */}

              {/* Australia */}
              {/* <path
                  d="M 800 360 Q 850 350 900 360 Q 930 380 940 410 Q 930 440 900 450 Q 850 460 800 450 Q 770 430 760 400 Q 770 370 800 360 Z"
                  filter="url(#glow)"
                  className="animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "2.5s" }}
                /> */}
              {/* </g> */}
              <image
                href="world-map2.png"
                x="0"
                y="0"
                width="1000"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
              {/* <img src='public/bit1.png'/> */}

              {/* Connection Lines */}
              {connections.map((connection) => (
                <g key={connection.id}>
                  {/* Connection path */}
                  <path
                    d={connection.path}
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    filter="url(#glow)"
                    className="animate-pulse-glow"
                  />

                  {/* Animated dot */}
                  <circle
                    r="3"
                    fill="white"
                    filter="url(#dotGlow)"
                    className="animate-pulse"
                  >
                    <animateMotion
                      dur={`${connection.duration}s`}
                      repeatCount="indefinite"
                      begin={`${connection.delay}s`}
                    >
                      <mpath href={`#path-${connection.id}`} />
                    </animateMotion>
                  </circle>

                  {/* Hidden path for motion */}
                  <path
                    id={`path-${connection.id}`}
                    d={connection.path}
                    fill="none"
                    stroke="none"
                  />
                </g>
              ))}

              {/* Nodes - More subtle and map-integrated */}
              {nodes.map((node, index) => (
                <g key={node.id}>
                  {/* Subtle node pulse effect */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="6"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{
                      animationDelay: `${index * 0.3}s`,
                      animationDuration: "3s",
                    }}
                  />

                  {/* Small dot marker */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="2"
                    fill="rgba(255,255,255,0.9)"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />

                  {/* Minimal label */}
                  <text
                    x={node.x}
                    y={node.y - 12}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.6)"
                    fontSize="8"
                    fontFamily="monospace"
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.2 + 1}s` }}
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Additional animated particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={`particle-${i}`}
                  r="1"
                  fill="rgba(147, 51, 234, 0.6)"
                  className="animate-float"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + (i % 3)}s`,
                  }}
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${100 + i * 70} ${100 + (i % 3) * 100}; ${
                      200 + i * 60
                    } ${150 + (i % 4) * 80}; ${100 + i * 70} ${
                      100 + (i % 3) * 100
                    }`}
                    dur={`${8 + (i % 4)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Status indicators */}
        <div
          className="flex justify-center mt-8 gap-8 animate-fade-in"
          style={{ animationDelay: "2s" }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>Data Flow Active</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>{nodes.length} Nodes Online</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>{connections.length} Active Connections</span>
          </div>
        </div>
      </div>
    </div>
  );
};
