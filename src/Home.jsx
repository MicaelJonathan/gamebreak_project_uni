import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('usuarioLogado');
    if (!loggedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(loggedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white font-sans selection:bg-purple-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -top-40 -right-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -bottom-20 -left-20"></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 border-b border-white/5 bg-slate-900/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black italic tracking-tighter">
            GAME<span className="text-purple-500">BREAK</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Player</p>
              <p className="text-sm font-bold text-purple-400">{user.nome}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-red-500/20 transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-6xl mx-auto p-6 pt-12">
        <header className="mb-12">
          <h2 className="text-5xl font-black mb-2">Bem-vindo de volta, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{user.nome}</span>!</h2>
          <p className="text-slate-400 text-lg">Escolha sua próxima missão na arena.</p>
        </header>

        {/* GRID DE AÇÕES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD JOGAR - DESTAQUE */}
          <button 
            onClick={() => navigate('/game')}
            className="group relative md:col-span-2 overflow-hidden bg-slate-900 border border-purple-500/30 rounded-3xl p-8 text-left transition-all hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            <div className="relative z-10">
              <span className="bg-purple-500 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter shadow-lg">Disponível</span>
              <h3 className="text-3xl font-black mt-4 mb-2 uppercase">Iniciar Emulador NES</h3>
              <p className="text-slate-400 max-w-sm">Reviva os clássicos com performance máxima e latência zero.</p>
              <div className="mt-8 flex items-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                Entrar na arena <span>→</span>
              </div>
            </div>
            {/* Ícone de fundo decorativo */}
            <div className="absolute -right-8 -bottom-8 text-9xl opacity-5 group-hover:opacity-10 transition-opacity rotate-12">🎮</div>
          </button>

          {/* COLUNA LATERAL */}
          <div className="flex flex-col gap-6">
            {/* CARD PERFIL */}
            <button 
              onClick={() => navigate('/perfil')}
              className="flex-1 bg-slate-900 border border-white/5 rounded-3xl p-6 text-left hover:bg-slate-800/50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                👤
              </div>
              <h3 className="font-bold text-xl">Meu Perfil</h3>
              <p className="text-sm text-slate-400">Ver estatísticas e conquistas.</p>
            </button>

            {/* STATUS BOX */}
            <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Server Status</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <p className="text-sm font-bold text-green-500 uppercase tracking-tighter">PostgreSQL Online</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}