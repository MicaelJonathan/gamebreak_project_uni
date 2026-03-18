import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();

  useEffect(() => {
    const host = window.location.origin;
    // Configurações Globais do EmulatorJS
    window.EJS_player = '#game-container';
    window.EJS_core = 'nes'; 
    window.EJS_gameUrl = `${host}/emulatorjs/roms/megaman.nes`;
    window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    //window.EJS_pathtodata = `${host}/emulatorjs/data/`;
    window.EJS_startOnLoaded = true; 

    const carregarEmulador = () => {
      // Verifica se o script já existe para não duplicar
      const scriptExistente = document.getElementById('ejs-loader');
      
      if (!scriptExistente) {
        const script = document.createElement('script');
        script.id = 'ejs-loader';
        script.src = '/emulatorjs/data/loader.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    carregarEmulador();

    // Cleanup: Limpa as variáveis globais ao sair da página para evitar bugs de memória
    return () => {
      const script = document.getElementById('ejs-loader');
      if (script) script.remove();
      
      // Se o emulador tiver uma função de stop/destruir, chamamos aqui
      if (window.EJS_emulator) {
        try {
          window.EJS_emulator.stop();
        } catch (e) {
          console.log("Emulador parado.");
        }
      }
      
      delete window.EJS_player;
      delete window.EJS_core;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorativo Neon */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -top-40 -left-20"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -bottom-40 -right-20"></div>

      {/* Header Estilizado */}
      <div className="relative z-10 w-full max-w-5xl flex justify-between items-center mb-6 mt-4">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group font-bold uppercase tracking-widest text-xs"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Sair da Arena
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            NES<span className="text-purple-500">RETRO</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase">Megaman Classic</p>
        </div>

        <div className="w-24"></div> {/* Spacer para centralizar o título */}
      </div>

      {/* Container do Emulador com Moldura "Gaming" */}
      <div className="relative z-10 w-full max-w-5xl group">
        {/* Borda de brilho externa */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div 
          id="game-container" 
          className="relative aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10"
        >
          {/* O EmulatorJS vai injetar o canvas aqui */}
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 animate-pulse">
            <p className="uppercase tracking-widest font-black">Carregando Core...</p>
          </div>
        </div>
      </div>

      {/* Painel de Controles Estilizado */}
      <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex items-center gap-6">
          <div className="text-3xl grayscale opacity-50">🕹️</div>
          <div>
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Movimentação</p>
            <p className="text-sm text-slate-300 font-bold uppercase">Setas do Teclado</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex items-center gap-6">
          <div className="text-3xl grayscale opacity-50">🎮</div>
          <div className="flex gap-8">
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Ação A/B</p>
              <p className="text-sm text-slate-300 font-bold uppercase">Teclas Z / X</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Start / Select</p>
              <p className="text-sm text-slate-300 font-bold uppercase">Enter / Shift</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}