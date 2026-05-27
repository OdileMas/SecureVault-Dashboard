export const recursiveSearch = (nodes, targetString) => {
  if (!targetString) return [];
  const matches = [];

  const traverse = (itemList) => {
    itemList.forEach(item => {
      if (item.name.toLowerCase().includes(targetString.toLowerCase())) {
        matches.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };

  traverse(nodes);
  return matches;
};