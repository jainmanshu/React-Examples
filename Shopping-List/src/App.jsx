import { useState } from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import Typeahead from "./components/Typeahead";

function App() {
  const [items, setItems] = useState([]);

  const handleAdd = (newItem) => {
    setItems((oldItem) => [{ name: newItem, checked: false }, ...oldItem]);
  };

  const toggleCheckItem = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDelete = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    // Tile, Input - Typeaahead, Shopping List (ability to strikethrough and delete)
    <>
      <h1>My Shopping List</h1>
      <Typeahead handleAddItems={handleAdd} />
      <ShoppingList
        items={items}
        handleDelete={handleDelete}
        handleToggle={toggleCheckItem}
      />
    </>
  );
}

export default App;
