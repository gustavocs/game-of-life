import { GameProvider } from './context/GameContext';
import Grid from './components/grid/Grid';
import Controls from './components/controls/Controls';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <Controls />
        <Grid />
      </div>
    </GameProvider>
  );
}

export default App;