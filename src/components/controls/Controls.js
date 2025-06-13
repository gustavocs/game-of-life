import { useGame } from '../../context/GameContext';
import './controls.css'

const Controls = () => {
	const {
		isRunning,
		jumpForward,
		toggleRunning,
		clearGrid,
		randomizeGrid,
		generation,
		run
	} = useGame();

	return (
		<>
			<div className="controls">
				<button onClick={toggleRunning}>{isRunning ? 'Stop' : 'Run'}</button>
				<button onClick={() => run()} disabled={isRunning}>Next</button>
				<button onClick={() => jumpForward(prompt("How many gens?"))} disabled={isRunning}>Jump forward</button>
				<button onClick={randomizeGrid} disabled={isRunning || generation > 0}>Random</button>
				<button onClick={clearGrid}>Reset</button>
				<span className="label">Generation: {generation}</span>
			</div>
		</>
	);
};

export default Controls;