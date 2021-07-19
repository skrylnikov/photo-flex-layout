import TinyQueue from 'tinyqueue';

import { IGraphBuilder, INode } from './types';

const buildPrecedentsMap = (
  graphBuilder: IGraphBuilder,
  startNode: number,
  endNode: number,
) => {
  // store the previous vertex of the shortest path of arrival
  const precedentsMap = new Map<number, number>();

  // store nodes already visited
  const visited = new Set<number>();

  // store/update only the shortest edge weights measured
  // the purpose of this is object is constant time lookup vs. binary heap lookup O(n)
  const storedShortestPaths: Record<string, number> = {};
  storedShortestPaths[startNode] = 0;

  // priority queue of ALL nodes and storedShortestPaths
  // don't bother to delete them because it's faster to look at visited?
  const pQueue = new TinyQueue<INode>(undefined, (a, b) => a.weight - b.weight);
  pQueue.push({ id: startNode, weight: 0 });

  while (pQueue.length !== 0) {
    // pop node with shortest total weight from start node
    const shortestNode = pQueue.pop();
    if (!shortestNode) continue;

    const shortestNodeId = shortestNode.id;

    // if already visited, continue
    if (visited.has(shortestNodeId)) continue;

    // visit neighboring nodes
    const neighboringNodes = graphBuilder(shortestNodeId) || new Map();
    visited.add(shortestNodeId);

    // meet the neighbors, looking for shorter paths
    for (const [neighbor, neighborValue] of neighboringNodes) {
      // weight of path from startNode to this neighbor
      const newTotalWeight = shortestNode.weight + neighborValue;

      // if this is the first time meeting the neighbor OR if the new total weight from
      // start node to this neighbor node is greater than the old weight path, update it,
      // and update precedent node
      if (
        typeof storedShortestPaths[neighbor] === 'undefined' ||
        storedShortestPaths[neighbor] > newTotalWeight
      ) {
        storedShortestPaths[neighbor] = newTotalWeight;
        pQueue.push({ id: neighbor, weight: newTotalWeight });
        precedentsMap.set(neighbor, shortestNodeId);
      }
    }
  }

  if (typeof storedShortestPaths[endNode] === 'undefined') {
    throw new Error(`There is no path from ${startNode} to ${endNode}`);
  }

  return precedentsMap;
};

// build the route from precedent node vertices
const getPathFromPrecedentsMap = (
  precedentsMap: Map<number, number>,
  endNode: number,
) => {
  let n = endNode;
  const nodes = [n];
  while (n) {
    n = precedentsMap.get(n)!;
    nodes.push(n);
  }
  return nodes.reverse();
};

// build the precedentsMap and find the shortest path from it
export const findShortestPath = (
  graph: IGraphBuilder,
  startNode: number,
  endNode: number,
) => {
  const precedentsMap = buildPrecedentsMap(graph, startNode, endNode);

  return getPathFromPrecedentsMap(precedentsMap, endNode);
};
