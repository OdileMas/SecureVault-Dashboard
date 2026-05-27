import { useMemo } from 'react';
import { recursiveSearch } from '../utils/recursiveSearch';

export const useRecursiveSearch = (nodes, query) => {
  return useMemo(() => recursiveSearch(nodes, query), [nodes, query]);
};