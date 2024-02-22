import { useMemo } from "react";

interface Props {
  size: number;
  timeRemaining: number;
  totalTime: number;
}

export default function Countdown({
  size = 200,
  timeRemaining,
  totalTime,
}: Props) {
  const ring = useMemo(() => size / 10, [size]);
  const xy = useMemo(() => size / 2, [size]);
  const radius = useMemo(() => (size - ring) / 2, [size, ring]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = useMemo(
    () => (timeRemaining / totalTime) * circumference,
    [totalTime, timeRemaining, circumference]
  );

  return (
    <>
      <svg height={size} width={size}>
        <circle
          cx={xy}
          cy={xy}
          r={radius}
          stroke="#dd2353"
          strokeWidth={ring}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - offset}
          strokeLinecap="round"
          fill="transparent"
        />
        <text
          x="50%"
          y="50%"
          text-fontSize={size / 2}
          text-anchor="middle"
          stroke="#dd2353"
          stroke-width="2px"
          dy=".3em"
        >
          {timeRemaining}
        </text>
      </svg>
    </>
  );
}
