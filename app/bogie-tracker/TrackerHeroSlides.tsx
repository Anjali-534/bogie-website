const BG_FROM = "#ffffff";
const BG_TO = "#faf6f0";
const ORANGE = "#FF6B2B";
const LINE = "#e9ddcc";
const INK = "#1f2937";

function SlideFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-full w-full"
      style={{ background: `linear-gradient(135deg, ${BG_FROM}, ${BG_TO})` }}
    >
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

const ROUTE_PATH =
  "M 60 360 C 160 300, 180 220, 280 210 S 420 260, 480 180 S 620 90, 740 100";

export function MapRouteSlide() {
  return (
    <SlideFrame>
      <g stroke={LINE} strokeWidth={1}>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 56} x2={800} y2={i * 56} />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 58} y1={0} x2={i * 58} y2={450} />
        ))}
      </g>
      <path
        d={ROUTE_PATH}
        fill="none"
        stroke={LINE}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        data-tracker-anim
        d={ROUTE_PATH}
        fill="none"
        stroke={ORANGE}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="10 8"
        style={{ animation: "tracker-dash-flow 3.5s linear infinite" }}
      />
      <circle cx={60} cy={360} r={6} fill={ORANGE} opacity={0.9} />
      <circle cx={740} cy={100} r={6} fill={INK} opacity={0.35} />
      <g
        data-tracker-anim
        style={{
          offsetPath: `path('${ROUTE_PATH}')`,
          animation: "tracker-ping-move 6s linear infinite",
        }}
      >
        <circle r={10} fill={ORANGE} opacity={0.25} />
        <circle r={5} fill={ORANGE} />
      </g>
    </SlideFrame>
  );
}

const GRID_NODES = [
  { x: 120, y: 120 }, { x: 260, y: 90 }, { x: 400, y: 160 }, { x: 560, y: 100 },
  { x: 680, y: 170 }, { x: 180, y: 260 }, { x: 340, y: 300 }, { x: 500, y: 260 },
  { x: 640, y: 320 }, { x: 100, y: 380 }, { x: 300, y: 400 }, { x: 470, y: 380 },
  { x: 620, y: 400 },
];

const GRID_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [3, 7], [4, 8],
  [5, 6], [6, 7], [7, 8], [5, 9], [6, 10], [7, 11], [8, 12], [9, 10], [10, 11], [11, 12],
];

export function DispatchGridSlide() {
  return (
    <SlideFrame>
      <g stroke={ORANGE} strokeWidth={1}>
        {GRID_EDGES.map(([a, b], i) => {
          const p1 = GRID_NODES[a];
          const p2 = GRID_NODES[b];
          return (
            <line
              key={i}
              data-tracker-anim
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              opacity={0.2}
              style={{
                animation: `tracker-line-pulse ${3 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 5) * 0.3}s`,
              }}
            />
          );
        })}
      </g>
      {GRID_NODES.map((n, i) => (
        <g
          key={i}
          data-tracker-anim
          style={{
            transformOrigin: `${n.x}px ${n.y}px`,
            animation: `tracker-node-pulse ${2.4 + (i % 3) * 0.4}s ease-in-out infinite`,
            animationDelay: `${(i % 6) * 0.25}s`,
          }}
        >
          <circle cx={n.x} cy={n.y} r={9} fill={ORANGE} opacity={0.15} />
          <circle cx={n.x} cy={n.y} r={4} fill={i % 4 === 0 ? INK : ORANGE} opacity={i % 4 === 0 ? 0.55 : 1} />
        </g>
      ))}
    </SlideFrame>
  );
}

const BOXES = [
  { x: 90, y: 300, w: 90, h: 70, delay: 0 },
  { x: 190, y: 260, w: 90, h: 110, delay: 0.4 },
  { x: 300, y: 320, w: 80, h: 60, delay: 0.8 },
  { x: 500, y: 250, w: 100, h: 120, delay: 0.2 },
  { x: 610, y: 300, w: 90, h: 80, delay: 0.6 },
  { x: 410, y: 310, w: 80, h: 70, delay: 1 },
];

export function WarehouseSlide() {
  return (
    <SlideFrame>
      <rect x={0} y={0} width={800} height={230} fill="#f4ebe0" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          data-tracker-anim
          x={100 + i * 110}
          y={30}
          width={30}
          height={200}
          fill={ORANGE}
          opacity={0.15}
          style={{
            animation: "tracker-dock-light 3.2s ease-in-out infinite",
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}
      <line x1={0} y1={230} x2={800} y2={230} stroke={LINE} strokeWidth={2} />
      {BOXES.map((b, i) => (
        <rect
          key={i}
          data-tracker-anim
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={4}
          fill="none"
          stroke={i % 2 === 0 ? ORANGE : "#9ca3af"}
          strokeWidth={2}
          style={{
            animation: `tracker-box-float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </SlideFrame>
  );
}

const BARS = [
  { x: 140, h: 90 }, { x: 210, h: 150 }, { x: 280, h: 110 }, { x: 350, h: 190 },
  { x: 420, h: 130 }, { x: 490, h: 210 }, { x: 560, h: 160 }, { x: 630, h: 240 },
];

export function AnalyticsSlide() {
  const baseline = 380;
  return (
    <SlideFrame>
      <g stroke={LINE} strokeWidth={1}>
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={80} y1={100 + i * 56} x2={720} y2={100 + i * 56} />
        ))}
      </g>
      {BARS.map((b, i) => (
        <rect
          key={i}
          data-tracker-anim
          x={b.x}
          y={baseline - b.h}
          width={40}
          height={b.h}
          fill={ORANGE}
          opacity={0.35}
          style={{
            transformOrigin: `${b.x + 20}px ${baseline}px`,
            animation: `tracker-bar-grow ${2.6 + (i % 3) * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <polyline
        points={BARS.map((b) => `${b.x + 20},${baseline - b.h - 22}`).join(" ")}
        fill="none"
        stroke={INK}
        strokeWidth={2}
        opacity={0.45}
      />
      {BARS.map((b, i) => (
        <circle
          key={`d${i}`}
          cx={b.x + 20}
          cy={baseline - b.h - 22}
          r={4}
          fill={INK}
          opacity={0.6}
        />
      ))}
    </SlideFrame>
  );
}
