function useTraverseTree() {
  const insertNode = (tree: any, folderId: any, isFolder: any, item: any) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        isFolder,
        name: item,
        items: [],
      });

      return tree;
    }

    let latestNode = [];

    latestNode = tree.items.map((ob: any) =>
      insertNode(ob, folderId, isFolder, item)
    );

    return { ...tree, items: latestNode };
  };

  const deleteNode = () => {}; // TODO

  const renameNode = () => {}; // TODO
  return { insertNode, deleteNode, renameNode };
}

export default useTraverseTree;
