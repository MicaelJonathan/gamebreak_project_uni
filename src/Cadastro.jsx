import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmaSenha } = dados;

    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch('/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate('/login'); // Redireciona após o sucesso
      } else {
        const erro = await response.json();
        alert("Erro: " + erro.message);
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 overflow-hidden relative font-sans">
      {/* Luzes Neon de fundo (invertidas em relação ao login para variação) */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -bottom-24 -right-24"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -top-24 -left-24"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            NOVO <span className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">PLAYER</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm font-medium uppercase tracking-widest">Crie sua conta na arena</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">Nome</label>
            <input 
              name="nome" 
              placeholder="Seu nome completo" 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-inner" 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">E-mail</label>
            <input 
              name="email" 
              type="email" 
              placeholder="seu@email.com" 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-inner" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">Senha</label>
              <input 
                name="senha" 
                type="password" 
                placeholder="********" 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-inner" 
                required 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-widest ml-1">Confirmar Senha</label>
              <input 
                name="confirmaSenha" 
                type="password" 
                placeholder="********" 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-inner" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-purple-600 text-white py-4 rounded-2xl hover:bg-purple-500 active:scale-[0.96] transition-all font-black text-lg uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_35px_rgba(147,51,234,0.5)]"
          >
            Finalizar Cadastro
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-sm text-slate-500">
            Já tem uma conta? 
            <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors ml-2 uppercase tracking-tighter">
              Faça Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}