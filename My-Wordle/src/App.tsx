import "./App.css";
import { useMemo, useState, useEffect, useCallback } from "react";
import words from "./config/words";
import Line from "./components/Line";
import confetti from "canvas-confetti";

type Guesses = string | null;

function App() {
  const puzzleWord = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toLowerCase();
  }, []);
  const [guesses, setGuesses] = useState<Guesses[]>(new Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver) return;
      if (event.key === "Enter") {
        if (currentGuess.length !== 5) return;
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        const isCorrect = puzzleWord === currentGuess;
        if (isCorrect) {
          confetti({
            particleCount: 300,
            spread: 360,
            origin: { y: 0.5 },
          });
          setGameOver(true);
        }
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) return;

      const isLetter = event.key.match(/^[a-z]{1}$/) != null;

      if (isLetter) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameOver, puzzleWord, guesses]);

  const gameLoss = useMemo(
    () => guesses.findIndex((val) => val === null) === -1,
    [guesses]
  );

  return (
    <div className="container">
      <h1>Wordle</h1>
      <div className="wordle-container">
        {guesses.map((guess, index) => {
          const isCurrentGuess =
            index === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={index}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!isCurrentGuess && guess != null}
              solution={puzzleWord}
            />
          );
        })}
      </div>
      {gameLoss && (
        <div>
          <h2 className="game-loss">Game Over!!!!</h2>
          <div>
            Correct answer is <span className="answer">{puzzleWord}</span>
          </div>
        </div>
      )}
      {gameOver && (
        <div>
          <h2 className="changing-color">Hooraay!! You guess it right!!</h2>
        </div>
      )}
      {(gameLoss || gameOver) && (
        <div>
          <button onClick={() => window.location.reload()}>Play Again!</button>
        </div>
      )}
    </div>
  );
}

export default App;
