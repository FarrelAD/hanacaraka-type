import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Home from '@/pages/Home';
import TypingGame from '@/features/typing-game/components/TypingGame';
import PuzzleGame from '@/features/puzzle-game/components/PuzzleGame';
import Footer from '@/components/layout/Footer';

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="h-dvh overflow-hidden flex flex-col bg-bg-theme text-text-theme font-mono selection:bg-main-theme/30 selection:text-main-theme">
        <Header />
        
        <div className="flex-1 w-full flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-hidden flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/typing" element={<TypingGame />} />
              <Route path="/puzzle" element={<PuzzleGame />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
