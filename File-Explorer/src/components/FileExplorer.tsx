import explorerData from "../data/explorerData";
import Folder from "./Folder";

function FileExplorer() {
  return <Folder data={explorerData} />;
}

export default FileExplorer;
