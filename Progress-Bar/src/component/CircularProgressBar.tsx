import { CSSProperties } from "react";

type Props = {
  value: number;
};

function CircularProgressBar({ value = 0 }: Props) {
  const progressStyle = {
    "--progress": `${value * 3.6}deg`,
  } as CSSProperties;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <div>Circular Progress Bar</div>
      <div className="progress-container">
        <div className="progress-circle" style={progressStyle}>
          <div className="center-value">{value}%</div>
        </div>
      </div>
    </div>
  );
}

export default CircularProgressBar;
