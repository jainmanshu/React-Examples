/* eslint-disable react/prop-types */
function ShoppingList({ items = [], handleDelete, handleToggle }) {
  return (
    <div>
      <ul>
        {items.map((item, index) => {
          return (
            <div className="list-item" key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(index)}
              />
              <p
                style={{
                  textDecoration: item.checked ? "line-through" : "none",
                }}
              >
                {item.name}
              </p>
              <button
                onClick={() => handleDelete(index)}
                disabled={item.checked}
              >
                Delete
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ShoppingList;
