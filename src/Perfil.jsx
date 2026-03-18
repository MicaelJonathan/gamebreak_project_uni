import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('usuarioLogado');
    if (!loggedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      setNovoNome(parsedUser.nome);
    }
  }, [navigate]);

  const handleSalvarNome = async () => {
    try {
      const response = await fetch('/api/atualizar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, novoNome }),
      });

      if (response.ok) {
        const usuarioAtualizado = { ...user, nome: novoNome };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        setUser(usuarioAtualizado);
        setEditando(false);
        alert("🛡️ Nome de Jogador atualizado!");
      } else {
        alert("Erro ao atualizar o nome.");
      }
    } catch (error) {
      alert("Erro na conexão.");
    }
  };

  const handleDeletarConta = async () => {
    const confirmar = window.confirm("⚠️ ATENÇÃO: Deseja apagar permanentemente seu progresso e conta?");
    if (confirmar) {
      try {
        const response = await fetch('/api/deletar', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id }),
        });
        if (response.ok) {
          localStorage.removeItem('usuarioLogado');
          navigate('/cadastro');
        }
      } catch (error) { alert("Erro ao deletar."); }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden font-sans">
      {/* Decoração de fundo */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -top-24 -right-24"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -bottom-24 -left-24"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/home" className="group flex items-center text-slate-400 hover:text-purple-400 transition-colors text-sm font-bold uppercase tracking-widest">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Voltar
          </Link>
          <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
            Config <span className="text-purple-500">Perfil</span>
          </h2>
        </div>

        <div className="space-y-6">
          {/* Campo de Nome */}
          <div className="p-5 bg-slate-800/40 rounded-2xl border border-white/5 transition-all hover:border-white/10">
            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">Nickname</p>
            {editando ? (
              <div className="flex flex-col gap-3">
                <input 
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-950 border border-purple-500/50 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button onClick={handleSalvarNome} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl text-xs font-bold uppercase transition-all shadow-neon">Confirmar</button>
                  <button onClick={() => setEditando(false)} className="px-4 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-xs font-bold uppercase transition-all">Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-lg text-white font-bold tracking-tight">{user.nome}</p>
                <button 
                  onClick={() => setEditando(true)} 
                  className="text-purple-400 text-xs font-black uppercase hover:text-purple-300 transition-colors border-b border-purple-400/30 hover:border-purple-300"
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Campo de E-mail (Somente leitura) */}
          <div className="p-5 bg-slate-800/20 rounded-2xl border border-white/5 opacity-80">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">E-mail de Acesso</p>
            <p className="text-md text-slate-300 font-medium">{user.email}</p>
          </div>

          {/* Área de Perigo */}
          <div className="pt-8 mt-4 border-t border-white/5">
            <button 
              onClick={handleDeletarConta}
              className="w-full text-red-500/60 hover:text-red-500 text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/20"
            >
              Apagar conta permanentemente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}