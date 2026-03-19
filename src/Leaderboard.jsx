import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Leaderboard() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (response.ok) {
          const data = await response.json();
          setRanking(data);
        }
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white p-4 md:p-8 relative overflow-hidden font-sans">
      {/* Background Decorativo Neon */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -top-24 -right-24"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -bottom-24 -left-24"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link to="/home" className="text-slate-400 hover:text-purple-400 transition-colors text-xs font-black uppercase tracking-[0.3em]">
            ← Voltar ao Menu
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter italic">
              Hall of <span className="text-purple-500">Fame</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.5em] uppercase mt-2">Os Melhores Jogadores de GameBreak</p>
          </div>
          <div className="w-24 hidden md:block"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {ranking.length === 0 ? (
              <p className="text-center text-slate-500 uppercase font-bold tracking-widest py-20">Nenhum score registrado ainda. Seja o primeiro!</p>
            ) : (
              <div className="grid gap-3">
                {ranking.map((player, index) => {
                  const isTop3 = index < 3;
                  const colors = ["border-yellow-500/50 bg-yellow-500/5", "border-slate-300/50 bg-slate-300/5", "border-orange-600/50 bg-orange-600/5"];
                  
                  return (
                    <div 
                      key={player.id}
                      className={`flex items-center justify-between p-5 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.01] ${isTop3 ? colors[index] : 'border-white/5 bg-slate-900/40'}`}
                    >
                      <div className="flex items-center gap-6">
                        <span className={`text-2xl font-black italic w-8 ${isTop3 ? 'text-white' : 'text-slate-600'}`}>
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-bold text-lg tracking-tight">{player.nome_usuario}</p>
                          <p className="text-[10px] text-slate-500 uppercase font-black">
                            {new Date(player.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`text-2xl font-black font-mono ${isTop3 ? 'text-purple-400 shadow-purple-500' : 'text-slate-300'}`}>
                          {player.pontuacao.toLocaleString()}
                        </p>
                        <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest">Points</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/game')}
            className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-xl"
          >
            Superar Recorde
          </button>
        </div>
      </div>
    </div>
  );
}