import {getUnvisitedNeighbors} from "../utils/utils"
export function breadthFirstSearch(grid, startNode, endNode) {
    if (!startNode || !endNode || startNode === endNode) {
        return false;
    }
    const visitedNodesInOrder = [];
    const unvisitedNodes = [];
    unvisitedNodes.push(startNode);

    while (unvisitedNodes.length !== 0) {
        let closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        let unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid)
        for (let neighbor of unvisitedNeighbors) {
            neighbor.previousNode = closestNode;
            if (neighbourNotInUnvisitedNodes(neighbor, unvisitedNodes)) {
                unvisitedNodes.push(neighbor);
            }
        }
    }
}

function neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
        if (node.row === neighbour.row && node.col === neighbour.col) {
            return false;
        }
    }
    return true;
}
