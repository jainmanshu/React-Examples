import { useState } from "react";

function Folder({ data, handleInsertNode }: any) {
  const [isExpanded, setExpanded] = useState(false);

  const [showInput, setShowInput] = useState<any>({
    isVisible: false,
    isFolder: false,
  });

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setExpanded(!isExpanded);
  };

  const handleAdd = (event: any, isFolder: any) => {
    event.stopPropagation();
    setShowInput({
      isVisible: true,
      isFolder,
    });
  };

  const handleAddFolder = (event: any) => {
    event.stopPropagation();
    if (event.keyCode === 13 && event.target.value) {
      //   Add logic
      handleInsertNode(data.id, event.target.value, showInput.isFolder);
      setShowInput({ ...showInput, isVisible: false });
    }
  };

  if (data.isFolder) {
    return (
      <div className="folder">
        <div>
          <span onClick={handleToggle}>🗂️ {data.name}</span>
          <span>
            <button
              style={{ marginLeft: 10 }}
              onClick={(e) => handleAdd(e, true)}
            >
              🗂️➕
            </button>
            <button
              style={{ marginLeft: 10 }}
              onClick={(e) => handleAdd(e, false)}
            >
              📄➕
            </button>
          </span>
        </div>
        {showInput.isVisible && (
          <div style={{ paddingLeft: 25 }}>
            <span>{showInput.isFolder ? "🗂️" : "📄"}</span>
            <input
              style={{ marginLeft: 10 }}
              type="text"
              autoFocus
              onKeyDown={handleAddFolder}
              onBlur={() => setShowInput({ ...showInput, isVisible: false })}
            />
          </div>
        )}
        <div
          style={{ display: isExpanded ? "block" : "none", paddingLeft: 25 }}
        >
          {data.items.map((item: any) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                data={item}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {data.name}</span>;
  }
}

export default Folder;
