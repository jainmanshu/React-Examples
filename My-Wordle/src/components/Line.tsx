const WORD_LENGTH = 5;
interface Props {
  guess: string;
  isFinal: boolean;
  solution: string;
}

function Line({ guess, isFinal = false, solution }: Props) {
  const tiles: any = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    let className = "tiles";
    const character = guess[i];

    if (isFinal) {
      if (character === solution[i]) {
        className += " correct";
      } else if (solution.includes(character)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div className={className} key={i}>
        {character}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
}

export default Line;
