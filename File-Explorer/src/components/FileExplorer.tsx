import { useState } from "react";
import explorerData from "../data/explorerData";
import useTraverseTree from "../hooks/useTraverseTree";
import Folder from "./Folder";

function FileExplorer() {
  const [treeData, setTreeData] = useState(explorerData);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId: any, item: any, isFolder: any) => {
    const newTreeData = insertNode(treeData, folderId, isFolder, item);
    setTreeData(newTreeData);
  };

  return <Folder handleInsertNode={handleInsertNode} data={treeData} />;
}

export default FileExplorer;
