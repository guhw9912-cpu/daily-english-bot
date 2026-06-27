import type { PitchData } from '@/types';

const W = 560;
const H = 72;
const PAD_X = 24;
const PAD_Y = 10;
const MIN_VAL = 1;
const MAX_VAL = 6;

function yOf(v: number) {
  return PAD_Y + ((MAX_VAL - v) / (MAX_VAL - MIN_VAL)) * (H - PAD_Y * 2);
}

export function PitchGraph({ data }: { data: PitchData }) {
  const { kr, en, values } = data;
  const n = values.length;
  const step = (W - PAD_X * 2) / (n - 1 || 1);
  const points = values.map((v, i) => ({ x: PAD_X + i * step, y: yOf(v) }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg width={W} height={H + 48} viewBox={`0 0 ${W} ${H + 48}`} className="w-full">
        <polyline points={polyline} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2563EB" />
        ))}
        {points.map((p, i) => (
          <g key={i}>
            <text x={p.x} y={H + 16} textAnchor="middle" fontSize="11" fill="#1E40AF" fontFamily="var(--font-inter)">
              {kr[i]}
            </text>
            <text x={p.x} y={H + 32} textAnchor="middle" fontSize="10" fill="#60A5FA" fontFamily="var(--font-inter)">
              {en[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
