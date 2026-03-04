import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import Perfil from './Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Se o cara entrar na raiz "/", mandamos para o "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Nossas rotas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;