import React, { useState } from "react";

const TreeNode = ({ node, searchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);

  const matches = node.name.toLowerCase().includes(searchTerm);

  const hasMatchingChild = node.children?.some(child =>
    checkMatch(child, searchTerm)
  );

  if (!matches && !hasMatchingChild && searchTerm) return null;

  return (
    <div className="tree-node">
      {node.children && (
        <button onClick={toggleNode} className="toggle-icon">
          {isOpen ? "↑" : "↓"}
        </button>
      )}
      <span style={{ fontWeight: matches ? "bold" : "normal" }}>{node.name}</span>
      {isOpen && node.children && (
        <TreeView data={node.children} searchTerm={searchTerm} />
      )}
    </div>
  );
};

const checkMatch = (node, searchTerm) => {
  if (node.name.toLowerCase().includes(searchTerm)) return true;
  return node.children?.some((child) => checkMatch(child, searchTerm));
};

const TreeView = ({ data, searchTerm = "" }) => {
  return (
    <div className="tree-view">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

export default TreeView;