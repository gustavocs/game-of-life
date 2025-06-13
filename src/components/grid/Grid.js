import { useGame } from '../../context/GameContext';
import './grid.css'

const Grid = () => {
	const { grid, gridSize, isRunning, toggleCellState } = useGame();
	return (
		<div
			className="grid"
			style={{ gridTemplateColumns: `repeat(${gridSize.cols}, 15px)` }}
		>
			{grid.map((rows, i) =>
				rows.map((col, j) => (
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