import { useState } from "react";

function Folder({ data }: any) {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setExpanded(!isExpanded);
  };

  if (data.isFolder) {
    return (
      <div className="folder">
        <span onClick={handleToggle}>🗂️ {data.name}</span>
        <div
          style={{ display: isExpanded ? "block" : "none", paddingLeft: 25 }}
        >
          {data.items.map((item: any) => {
            return <Folder data={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {data.name}</span>;
  }
}

export default Folder;
