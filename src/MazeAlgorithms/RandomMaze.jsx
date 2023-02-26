export default function generateRandomMaze(grid, startNode, finishNode) {
    const newGrid = Array.from(grid);
    const row_count = newGrid.length;
    const column_count = newGrid[0].length;

    const walls = []
    // Carve out a random maze
    for (let row = 0; row < row_count; row++) {
        for (let col = 0; col < column_count; col++) {
            if (Math.random() < 0.33) {
                walls.push(newGrid[row][col]);
            }
        }
    }

    walls.sort(() => Math.random() - 0.5);

    return walls;
};





