import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Home from '@/components/Home';
import TypingGame from '@/components/TypingGame';
import PuzzleGame from '@/components/PuzzleGame';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="h-dvh overflow-hidden flex flex-col bg-bg-monkey text-text-monkey font-mono selection:bg-main-monkey/30 selection:text-main-monkey">
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
