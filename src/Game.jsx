import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const navigate = useNavigate();

  useEffect(() => {
    // Gloabals emulatorjs
    window.EJS_player = '#game-container';
    window.EJS_core = 'nes'; // (USA) NES
    window.EJS_gameUrl = '/emulatorjs/roms/megaman.nes';
    window.EJS_pathtodata = '/emulatorjs/data/'; 
    window.EJS_startOnLoaded = true; 

    const carregarEmulador = () => {
        if (!document.getElementById('ejs-loader')) {
        const script = document.createElement('script');
        script.id = 'ejs-loader';
        script.src = '/emulatorjs/data/loader.js';
        script.async = true;
        document.body.appendChild(script);
        } else {
        if (window.EJS_emulator) {
            window.EJS_emulator.stop();
            // Pequeno delay para o DOM resetar, ou o emulador fica de birra.
            setTimeout(() => window.location.reload(), 100); 
        }
        }
    };

    carregarEmulador();

    return () => {
    const script = document.getElementById('ejs-loader');
    if (script) document.body.removeChild(script);
    delete window.EJS_player;
    delete window.EJS_core;
  };

  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate('/home')}
          className="text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          ← Voltar para Home
        </button>
        <h1 className="text-xl font-bold text-white tracking-widest">NES RETRO PLAYER</h1>
      </div>

      {/* Onde o jogo vai aparecer */}
      <div 
        id="game-container" 
        className="w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-800"
      >
        {/*EmulatorJS */}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8 text-gray-400 text-sm">
        <div className="text-center">
          <p className="font-bold text-gray-300">CONTROLES</p>
          <p>Setas: Movimentação</p>
          <p>Z / X: Botões A / B</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-gray-300">SISTEMA</p>
          <p>Enter: Start</p>
          <p>Shift: Select</p>
        </div>
      </div>
    </div>
  );
}