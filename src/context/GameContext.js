import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { computeNextGeneration, generateEmptyGrid, generateRandomGrid } from '../services/gameLogic';

const GameContext = createContext();
const CELL_SIZE = 15;

export const GameProvider = ({ children }) => {
	const speed = 100; // in ms

	const [grid, setGrid] = useState(() => generateEmptyGrid());
	const [isRunning, setIsRunning] = useState(false);
	const [generation, setGeneration] = useState(0);
	// const [population, setPopulation] = useState(0);
	const [gridSize, setGridSize] = useState({
		rows: 0,
		cols: 0
	});

	const runner = useRef(null);

	useEffect(() => {
		setGridSize({
			rows: Math.floor(window.innerHeight / CELL_SIZE),
			cols: Math.floor(window.innerWidth / CELL_SIZE)
		});
	}, []);

	const clearGrid = useCallback(() => {
		setGrid(generateEmptyGrid(gridSize.rows, gridSize.cols));
		setGeneration(0);
		setIsRunning(false);
	}, [gridSize]);

	useEffect(() => {
		clearGrid();
	}, [clearGrid]);

	const run = useCallback(() => {
		setGrid(g => computeNextGeneration(g, gridSize.rows, gridSize.cols));
		setGeneration(g => g + 1);
	}, [gridSize]);

	const jumpForward = useCallback((n) => {
		for (let i = 0; i < n; i++) {
			setTimeout(run, i * speed);
		}
	}, [run]);

	useEffect(() => {
		if (isRunning) {
			runner.current = setInterval(run, speed);
		} else {
			clearInterval(runner.current);
		}
	}, [isRunning, run]);

	const toggleRunning = () => {
		setIsRunning(running => !running);
	};

	const randomizeGrid = () => {
		setGrid(generateRandomGrid(gridSize.rows, gridSize.cols));
		setGeneration(0);
	};

	const toggleCellState = (row, col) => {
		if (isRunning || generation > 0) return;

		const newGrid = grid.map(arr => [...arr]);
		newGrid[row][col] = grid[row][col] ? 0 : 1;
		setGrid(newGrid);
	};

	const value = {
		grid,
		gridSize,
		isRunning,
		generation,
		toggleRunning,
		clearGrid,
		randomizeGrid,
		toggleCellState,
		run,
		jumpForward,
		CELL_SIZE
	};

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
	return useContext(GameContext);
};