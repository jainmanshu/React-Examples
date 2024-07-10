type Props = {
  value: number;
};

function ProgressBar({ value = 0 }: Props) {
  return (
    <div className="progress-bar">
      <div>Progess Bar</div>
      <div className="progress">
        <span>{value.toFixed()}%</span>
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
