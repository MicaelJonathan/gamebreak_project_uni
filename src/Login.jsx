import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
        navigate('/home');
      } else {
        alert("Erro no Login: " + data.message);
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 overflow-hidden relative">
      {/* Efeito de luz neon ao fundo */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -top-24 -left-24"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -bottom-24 -right-24"></div>

      <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            GAME<span className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">BREAK</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm font-medium uppercase tracking-[0.2em]">Acesse a Arena</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">E-mail</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-inner"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">Senha</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all shadow-inner"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-purple-600 text-white py-4 rounded-2xl hover:bg-purple-500 active:scale-[0.95] transition-all font-black text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)]"
          >
            Entrar no Jogo
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Ainda não tem conta? 
            <Link to="/cadastro" className="text-purple-400 font-bold hover:text-purple-300 transition-colors ml-2 uppercase tracking-tighter">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}