import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  // --- 1. HOOKS DEVEM FICAR AQUI (No topo do corpo da função) ---
  const [user, setUser] = useState(null);
  const [score, setScore] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o usuário logado
    const loggedUser = localStorage.getItem('usuarioLogado');
    if (!loggedUser) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(loggedUser);
    setUser(parsedUser);

    // --- CONFIGURAÇÃO DO EMULADOR ---
    window.EJS_player = '#game-container';
    window.EJS_core = 'nes'; 
    window.EJS_gameUrl = '/emulatorjs/roms/megaman.nes';
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'; 
    window.EJS_startOnLoaded = true; 

    const scriptId = 'ejs-loader';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '/emulatorjs/data/loader.js';
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (window.EJS_emulator) {
        try { window.EJS_emulator.stop(); } catch (e) {}
      }
    };
  }, [navigate]);

  // --- FUNÇÃO PARA ENVIAR SCORE ---
  const enviarScore = async () => {
    if (!score) return;
    setEnviando(true);
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          usuario_id: user.id, 
          nome: user.nome, 
          pontuacao: parseInt(score) 
        }),
      });

      if (response.ok) {
        alert("🏆 RANKING ATUALIZADO!");
        setShowModal(false);
        setScore('');
      }
    } catch (error) {
      alert("Erro na conexão.");
    } finally {
      setEnviando(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest uppercase italic">Autenticando...</div>;

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center p-4 relative overflow-hidden font-sans selection:bg-purple-500/30 text-white">
      {/* Background Decorativo */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -top-40 -left-20"></div>
      
      {/* Header */}
      <div className="relative z-10 w-full max-w-5xl flex justify-between items-center mb-6 mt-4">
        <button onClick={() => navigate('/home')} className="text-slate-400 hover:text-white transition-all font-bold uppercase tracking-widest text-xs">← Voltar</button>
        <h1 className="text-2xl font-black italic tracking-tighter">GAME<span className="text-purple-500">BREAK</span></h1>
        <div className="w-12"></div>
      </div>

      {/* Container do Emulador */}
      <div className="relative z-10 w-full max-w-5xl group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 transition duration-1000"></div>
        <div id="game-container" className="relative aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10"></div>
      </div>

      {/* Modal/Seção de Score */}
      <div className="relative z-10 mt-8 w-full max-w-5xl">
        {!showModal ? (
          <button 
            onClick={() => setShowModal(true)}
            className="w-full bg-slate-900 border border-purple-500/30 py-4 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all active:scale-95 shadow-lg"
          >
            Finalizar Partida e Salvar Score
          </button>
        ) : (
          <div className="bg-slate-900/90 backdrop-blur-xl border border-purple-500/50 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-black italic uppercase">Salvar no Ranking</h3>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Player: {user.nome}</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="number" 
                placeholder="Pontos"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="flex-1 md:w-32 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500 font-mono"
              />
              <button 
                onClick={enviarScore}
                disabled={enviando}
                className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-xl font-bold uppercase text-sm shadow-neon disabled:opacity-50"
              >
                {enviando ? '...' : 'Enviar'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 text-slate-500 hover:text-white">X</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}