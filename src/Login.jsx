import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Fazendo a requisição para o servidor
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        navigate('/home'); // Página principal
      } else {
        // 404 error
        alert("Erro no Login: " + data.message);
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Bem-vindo</h2>
        <p className="text-gray-500 mt-2 text-sm">Acesse sua conta para continuar</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">E-mail</label>
          <input 
            type="email" 
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Senha</label>
          <input 
            type="password" 
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all font-bold text-lg shadow-lg shadow-blue-200"
        >
          Entrar
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Ainda não tem conta? 
          <Link to="/cadastro" className="text-blue-600 font-bold hover:underline ml-1">
            Cadastre-se grátis
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}