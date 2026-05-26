import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Meihua from "./pages/Meihua";
import Bazi from "./pages/Bazi";
import Shenbu from "./pages/Shenbu";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* 首页 */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* 梅花易数 */}
        <Route
          path="/meihua"
          element={<Meihua />}
        />

        {/* 八字排盘 */}
        <Route
          path="/bazi"
          element={<Bazi />}
        />

        {/* 神卜占卜（占位） */}
        <Route
          path="/shenbu"
          element={<Shenbu />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;