import './App.css'

import React, { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import TreeView from "./TreeView";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openNodes, setOpenNodes] = useState(new Set());

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleExpandAll = () => {
    const allNodeIds = new Set();
    const collectIds = (nodes) => {
      for (const node of nodes) {
        allNodeIds.add(node.id);
        if (node.children) collectIds(node.children);
      }
    };
    collectIds(data);
    setOpenNodes(allNodeIds);
  };

  const handleCollapseAll = () => setOpenNodes(new Set());

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleExpandAll}>Expand All</button>
        <button onClick={handleCollapseAll}>Collapse All</button>
      </div>
      <TreeView
        data={data}
        searchTerm={search.toLowerCase()}
        openNodes={openNodes}
        setOpenNodes={setOpenNodes}
      />
    </div>
  );
}