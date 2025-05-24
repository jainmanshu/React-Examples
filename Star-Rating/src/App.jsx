import { useState } from 'react';
import './App.css';

const NO_OF_STARS = 5;

function App() {
  const [rated, setRated] = useState(2);
  const [hovered, setHovered] = useState(null);

  const handleClick = (index) => {
    setRated(index + 1);
  };

  const handleMouseEnter = (index) => {
    setHovered(index + 1);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div role="radiogroup" aria-label="Star Rating">
      {Array(NO_OF_STARS).fill(null).map((_, i) => (
        <span
          key={i}
          role="radio"
          aria-checked={i < rated}
          tabIndex={0}
          style={{
            fontSize: 100,
            color: (hovered ?? rated) > i ? 'gold' : '#ccc',
            cursor: 'pointer',
          }}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(i);
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default App;