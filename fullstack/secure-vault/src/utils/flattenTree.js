export const flattenTree = (nodes, expandedFolders) => {
  const flatList = [];
  
  const recurse = (nodeList) => {
    nodeList.forEach(node => {
      flatList.push(node);
      if (node.type === 'folder' && expandedFolders[node.id] && node.children) {
        recurse(node.children);
      }
    });
  };
  
  recurse(nodes);
  return flatList;
};