import MinHeap from "../utils/MinHeap";
// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, endNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = new MinHeap();
    unvisitedNodes.insert(startNode);

    while (!unvisitedNodes.isEmpty()) {
        const closestNode = unvisitedNodes.extractMin();
        if (closestNode.isWall) continue;
        if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        updateUnvisitedNeighbors(closestNode, grid, endNode, unvisitedNodes);
    }
}

function updateUnvisitedNeighbors(node, grid, endNode, unvisitedNodes) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        if (neighbor.distance > node.distance + 1) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
            unvisitedNodes.insert(neighbor);
        }
        if (neighbor === endNode) {
            return;
        }
    }

}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}