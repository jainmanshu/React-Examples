interface Props {
  res: string[];
}

function BreakingLogo({ res }: Props) {
  return (
    <>
      <div className="wrapper">
        <span>{res[0]}</span>
        {res[1] && <span className="element">{res[1]}</span>}
        <span>{res[2]}</span>
      </div>
    </>
  );
}

export default BreakingLogo;
