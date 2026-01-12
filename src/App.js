import './App.css';
import { useState,useEffect } from 'react';
import { CardGrid } from './pages/cardGrid';

function App() {
  const [scale, setScale] = useState(1);

  const gameStyle = { 
    transform: `scale(${scale})`,
  };

  useEffect(() => {
    // 視窗縮放
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="game-viewport">
      <div style={gameStyle}>
        <CardGrid />
      </div>
    </div>
  );
}

export default App;
