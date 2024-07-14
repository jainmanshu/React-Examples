import { useState } from "react";
import "./App.css";

const configLights = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

type CellProps = {
  onClick: Function;
  isActive: boolean;
  disabled: boolean;
};

function Cell({ onClick, isActive, disabled }: CellProps) {
  return (
    <button
      className={`${isActive ? "cell cell-activated" : "cell"}`}
      onClick={() => onClick()}
      disabled={disabled}
    />
  );
}

function App() {
  const [order, setOrder] = useState<Number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index: number) => {
    const newOrder = [...order, index];
    setOrder((prevOrder) => [...prevOrder, index]);

    if (configLights.flat().filter(Boolean).length === newOrder.length) {
      deactivate();
    }
  };

  const deactivate = () => {
    setIsDeactivating(true);

    const timer = setInterval(() => {
      setOrder((prevOrder) => {
        const newOrder = prevOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          setIsDeactivating(false);
          clearInterval(timer);
        }

        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="wrapper">
      <h1>Grid Lights</h1>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${configLights[0].length}, 1fr)`,
        }}
      >
        {configLights.flat().map((light, index) => {
          return light ? (
            <Cell
              key={index}
              onClick={() => handleClick(index)}
              isActive={order.includes(index)}
              disabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
