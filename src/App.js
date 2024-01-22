import React from 'react'
import GameSetup from './pages/GameSetup'
import MainDisplay from './pages/MainDisplay';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GameSetup />} />
        <Route path="/main-display/:sessionId" element={<MainDisplay />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
