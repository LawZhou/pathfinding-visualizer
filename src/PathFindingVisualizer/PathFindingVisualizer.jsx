import React, {useEffect, useState} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import './PathFindingVisualizer.css';
import NavBar from "./NavBar";

import generateRandomMaze from "../MazeAlgorithms/RandomMaze";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const ROW_COUNT = 20
const COLUMN_COUNT = 50
export default function PathfindingVisualizer() {
    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [mazeSpeed, setMazeSpeed] = useState(10);

    useEffect(() => {
        setGrid(getInitialGrid());
    }, []);

    function handleReset() {
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let col = 0; col < COLUMN_COUNT; col++) {
                if (row === START_NODE_ROW && col === START_NODE_COL){
                    document.getElementById(`node-${row}-${col}`).className = "node node-start";
                } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
                    document.getElementById(`node-${row}-${col}`).className = "node node-finish";
                } else {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }

            }
        }
        setGrid(getInitialGrid());
    }

    function handlePause(){
        console.log("pause")
    }
    function handleMouseDown(row, col) {
        setGrid(getNewGridWithWallToggled(grid, row, col));
        setMouseIsPressed(true);
    }

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed) return;
        setGrid(getNewGridWithWallToggled(grid, row, col));
    }

    function handleMouseUp(){
        setMouseIsPressed(false);
    }

    function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }
    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, speed) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, speed * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, speed * i);
        }
    }

    function getNewGridWithMaze(grid, walls) {
        const newGrid = grid.slice();
        for (let wall of walls) {
            const node = grid[wall["row"]][wall["col"]];
            newGrid[wall["row"]][wall["col"]] = {
                ...node,
                isWall: true,
            };
        }
        return newGrid;
    }

    function animateMazeGeneration(walls) {
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
                setTimeout(() => {
                    handleReset();
                    const newGrid = getNewGridWithMaze(grid, walls);
                    setGrid(newGrid)
                }, i * mazeSpeed);
                return;
            }
            let wall = walls[i];
            let node = grid[wall["row"]][wall["col"]];

            setTimeout(() => {
                //Walls
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    "node node-wall";
            }, i * mazeSpeed);
        }
    }

    function generateMaze() {
        setTimeout(() => {
            const startNode = grid[START_NODE_ROW][START_NODE_COL]
            const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
            const walls = generateRandomMaze(grid, startNode, finishNode)
            animateMazeGeneration(walls)
        }, mazeSpeed)
    }

    function visualizeDijkstra(speed) {
        const speed_dict = {
            "Fast": 10,
            "Medium": 30,
            "Slow": 50
        }
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, speed_dict[speed]);
    }


    return (
        <>
            <NavBar
                handlePlayButton={visualizeDijkstra}
                handlePauseButton={handlePause}
                handleResetButton={handleReset}
                generateMaze={generateMaze}>
            </NavBar>
            <div className={"grid"}>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {
                                row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            props={{
                                                col: col,
                                                isFinish: isFinish,
                                                isStart: isStart,
                                                isWall: isWall,
                                                mouseIsPressed: mouseIsPressed,
                                                onMouseDown: (row, col) => handleMouseDown(row, col),
                                                onMouseEnter: (row, col) =>
                                                    handleMouseEnter(row, col),
                                                onMouseUp: () => handleMouseUp(),
                                                row: row
                                            }}></Node>
                                    )
                                })
                            }
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}

function getInitialGrid() {
    const grid = [];
    for (let row = 0; row < ROW_COUNT; row++) {
        const currentRow = [];
        for (let col = 0; col < COLUMN_COUNT; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
}

function createNode(col, row) {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
}

function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
