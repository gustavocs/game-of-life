// gameLogic.js 

export const generateEmptyGrid = (rows, cols) => {
	return Array.from({ length: rows }, () => Array(cols).fill(0));
};

export const generateRandomGrid = (rows, cols) => {
	return Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
	);
};

export const computeNextGeneration = (grid, rows, cols) => {
	const newGrid = generateEmptyGrid(rows, cols);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			newGrid[i][j] = computeCellNextGeneration(grid, i, j);
		}
	}
	return newGrid;
};

const computeCellNextGeneration = (grid, i, j) => {
	const current = grid[i][j];
	const neighbors = countAliveNeighbors(grid, i, j);

	return liveOrDie(current, neighbors);
}

const countAliveNeighbors = (grid, i, j) => {
	// These value pairs will be added to original position
	const positions = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1], [0, 1],
		[1, -1], [1, 0], [1, 1],
	];

	let neighbors = 0;
	positions.forEach(([x, y]) => {
		const newI = i + x;
		const newJ = j + y;
		if (newI >= 0 && newI < grid.length && newJ >= 0 && newJ < grid[i].length) { // Validates if neighbor position is inside the grid boundaries
			neighbors += grid[newI][newJ];
		}
	});

	return neighbors;
}

const liveOrDie = (current, neighbors) => {
	let state;
	if (current === 1 && (neighbors < 2 || neighbors > 3)) { // Cell dies for isolation or overpopulation
		state = 0;
	} else if (current === 0 && neighbors === 3) { // A new cell is born
		state = 1;
	} else {
		state = current; // Remains unchanged
	}

	return state;
}
