export default function GenerateDFSMaze(grid, startNode, finishNode) {
    const newGrid = Array.from(grid);
    const unvisitedCells = new Set();
    const rowCount = newGrid.length;
    const colCount = newGrid[0].length;

    // Add all cells to the set of unvisited cells
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            const cell = newGrid[row][col];
            if (cell !== startNode && cell !== finishNode) {
                unvisitedCells.add(cell);
            }
        }
    }
    const startCell = [...unvisitedCells][Math.floor(Math.random() * unvisitedCells.size)];
    const walls = []
    const stack = []
    stack.push(startCell)
    randomizedDFS(newGrid, unvisitedCells, walls, stack)
    console.log(walls)
    return walls
}

function randomizedDFS(newGrid, unvisitedCells, walls, stack) {
    while (stack.length > 0) {
        let cell = stack.pop()
        if (!unvisitedCells.has(cell)) {
            continue;
        }
        // mark visited
        unvisitedCells.delete(cell);
        if (Math.random() < 0.33) {
            cell.isWall = true;
            walls.push(cell)
        }
        let neighbors = getRandomUnvisitedNeighbors(newGrid, cell, unvisitedCells);
        stack.push(...neighbors)
    }


}


function getRandomUnvisitedNeighbors(grid, cell, unvisitedCells) {
    const neighbors = [];
    const row = cell.row;
    const col = cell.col;

    if (row > 0 && unvisitedCells.has(grid[row - 1][col])) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1 && unvisitedCells.has(grid[row + 1][col])) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0 && unvisitedCells.has(grid[row][col - 1])) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1 && unvisitedCells.has(grid[row][col + 1])) {
        neighbors.push(grid[row][col + 1]);
    }
    neighbors.sort(() => Math.random() - 0.5);
    return neighbors;
}
