import { useGame } from '../../context/GameContext';
import './grid.css'

const Grid = () => {
	const { CELL_SIZE, grid, gridSize, isRunning, toggleCellState } = useGame();
	return (
		<div
			className="grid"
			style={{ gridTemplateColumns: `repeat(${gridSize.cols}, ${CELL_SIZE}px)` }}
		>
			{grid.map((rows, i) =>
				rows.map((_, j) => (
					<div
						key={`${i}-${j}`}
						onClick={() => { if (!isRunning) toggleCellState(i, j); }}
						className={`cell ${grid[i][j] ? 'alive' : ''}`}
					/>
				))
			)}
		</div>
	);
};

export default Grid;