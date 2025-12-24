/**
 * App - Temporary demo harness for Canvas rendering
 * This will be replaced with the full editor later
 */


import { CanvasArea } from './components/canvas/CanvasArea';
import { productCardExample } from './ir.example';
import './styles/global.scss';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <CanvasArea 
        appIR={productCardExample} 
        currentPageId="page-1" 
      />
    </div>
  );
}

export default App;
