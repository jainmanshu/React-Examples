import { useState } from "react";
import "./App.css";
import Container from "./component/Container";
import { data } from "./component/data";

type Data = {
  title: string;
  id: number;
  checked: boolean;
};

function App() {
  const [items, setData] = useState<Data[]>(data);

  const [leftItems, setLeftItems] = useState<Data[]>(items);
  const [rightItems, setRightItems] = useState<Data[]>([]);

  const onChange = (id: number, checked: boolean, direction: string) => {
    const iterableContainer = direction === "left" ? leftItems : rightItems;
    let newItems = iterableContainer.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: checked,
        };
      } else {
        return item;
      }
    });
    if (direction === "left") {
      setLeftItems(newItems);
    } else {
      setRightItems(newItems);
    }
  };

  const moveLeft = () => {
    const checkedItems: Data[] = leftItems.filter((items) => items.checked);
    const uncheckedItems: Data[] = leftItems.filter((items) => !items.checked);
    let resetCheckedItems = checkedItems.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    let final: Data[] = [...rightItems, ...resetCheckedItems];
    setRightItems(final);
    setLeftItems(uncheckedItems);
  };

  const moveRight = () => {
    const checkedItems: Data[] = rightItems.filter((items) => items.checked);
    const uncheckedItems: Data[] = rightItems.filter((items) => !items.checked);
    let resetCheckedItems = checkedItems.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
    let final: Data[] = [...leftItems, ...resetCheckedItems];
    setLeftItems(final);
    setRightItems(uncheckedItems);
  };

  const handleTransfer = (direction: string) => {
    return direction === "left" ? moveLeft() : moveRight();
  };

  return (
    <>
      <h1>Transfer List</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <Container
          items={leftItems}
          onChange={(id: number, checked: boolean) =>
            onChange(id, checked, "left")
          }
        />
        <div id="button-container">
          <button onClick={() => handleTransfer("left")}>Right</button>
          <button onClick={() => handleTransfer("right")}>Left</button>
        </div>
        <Container
          items={rightItems}
          onChange={(id: number, checked: boolean) =>
            onChange(id, checked, "right")
          }
        />
      </div>
    </>
  );
}

export default App;
