export default function generateRandomMaze(grid, startNode, finishNode) {
    const newGrid = Array.from(grid);
    const row_count = newGrid.length;
    const column_count = newGrid[0].length;

    // Carve out a random maze
    for (let row = 2; row < row_count - 2; row += 2) {
        for (let col = 2; col < column_count - 2; col += 2) {
            if (
                (row === startNode.row && col === startNode.col) ||
                (row === finishNode.row && col === finishNode.col)
            )
                continue;
            const wallNode = newGrid[row][col];
            wallNode.isWall = true;

            // Randomly choose a neighboring node to connect to
            const neighbors = [];
            if (row > 2) neighbors.push(newGrid[row - 2][col]);
            if (row < row_count - 3) neighbors.push(newGrid[row + 2][col]);
            if (col > 2) neighbors.push(newGrid[row][col - 2]);
            if (col < column_count - 3) neighbors.push(newGrid[row][col + 2]);
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

            if (
                (randomNeighbor.row === startNode.row && randomNeighbor.col === startNode.col) ||
                (randomNeighbor.row === finishNode.row && randomNeighbor.col === finishNode.col)
            )
                continue;
            // Carve a path to the chosen neighbor
            if (randomNeighbor.row < wallNode.row) {
                // Neighbor is above wall node
                newGrid[wallNode.row - 1][col].isWall = false;
            } else if (randomNeighbor.row > wallNode.row) {
                // Neighbor is below wall node
                newGrid[wallNode.row + 1][col].isWall = false;
            } else if (randomNeighbor.col < wallNode.col) {
                // Neighbor is to the left of wall node
                newGrid[row][wallNode.col - 1].isWall = false;
            } else {
                // Neighbor is to the right of wall node
                newGrid[row][wallNode.col + 1].isWall = false;
            }
        }
    }

    const walls = []
    for (let row = 2; row < row_count - 2; row += 2) {
        for (let col = 2; col < column_count - 2; col += 2) {
            if (newGrid[row][col].isWall) {
                walls.push(newGrid[row][col]);
            }
        }
    }

    walls.sort(() => Math.random() - 0.5);

    return walls;
};





