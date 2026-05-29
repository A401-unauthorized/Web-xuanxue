import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MeiHuaPage from './pages/MeiHuaPage';
import QiMenPage from './pages/QiMenPage';
import BaZiPage from './pages/BaZiPage';
import ShenBoPage from './pages/ShenBoPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meihua" element={<MeiHuaPage />} />
          <Route path="/qimen" element={<QiMenPage />} />
          <Route path="/bazi" element={<BaZiPage />} />
          <Route path="/shenbo" element={<ShenBoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
