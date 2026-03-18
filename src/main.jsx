//src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Cadastro from './Cadastro.jsx'
import Home from './Home.jsx'
import Perfil from './Perfil.jsx'
import Game from './Game.jsx'
import Leaderboard from './Leaderboard.jsx'
import '../app/globals.css';

console.log("React version:", React.version);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        {}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)