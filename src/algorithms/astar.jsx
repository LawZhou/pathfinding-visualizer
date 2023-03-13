import {getUnvisitedNeighbors} from "../utils/utils"
export function aStarSearch(grid, startNode, endNode) {
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }

    const visitedNodesInOrder = []; // open list
    const unvisitedNodes = getAllNodes(grid); // close list



}

// Helper function to get all nodes in the grid
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}