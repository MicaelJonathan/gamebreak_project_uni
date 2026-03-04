import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Buscando usuário logado no localStorage
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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">

        <h2 className="text-2xl font-bold text-gray-900">Olá, {user.nome}!</h2>
        <p className="text-gray-500 mt-2">Bem-vindo!</p>

        <div className="mt-10 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase">Status da Conta</p>
            <p className="text-sm font-medium text-green-600 flex items-center mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conectado via PostgreSQL
            </p>
            </div>

            <button 
                onClick={() => navigate('/jogar')}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold mt-4 hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all"
            >
                🎮 Iniciar Jogo (NES)
            </button>

        <button 
            onClick={() => navigate('/perfil')}
            className="w-full bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-100 active:scale-[0.98] transition-all font-bold text-lg border border-blue-100"
            >
            Ver Perfil

        </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 active:scale-[0.98] transition-all font-bold text-lg border border-red-100"
          >
            Sair da Conta

          </button>
        </div>
      </div>
    </div>
  );
}