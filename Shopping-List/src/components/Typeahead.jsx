import debounce from "lodash.debounce";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Typeahead({ handleAddItems }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const fetchSuggestion = async (fieldQuery) => {
    if (!fieldQuery) {
      // Clear items if query is empty
      setItems([]);
      return;
    }
    const response = await fetch(
      `https://api.frontendeval.com/fake/food/${fieldQuery}`
    );
    const data = await response.json();
    setItems(data);
  };

  const debouncedFetch = debounce((value) => fetchSuggestion(value), 500);

  const handleChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFetch(value);
  };

  const handleClickSuggestion = (item) => {
    handleAddItems(item);
    setItems([]);
    setQuery("");
  };

  return (
    <div>
      <input
        value={query}
        placeholder="Search Items"
        type="text"
        onChange={handleChange}
        className="input-typeahead"
      />
      <ul className="suggestion-list">
        {items.map((item, index) => (
          <p key={index} onClick={() => handleClickSuggestion(item)}>
            {item}
          </p>
        ))}
      </ul>
    </div>
  );
}

export default Typeahead;
