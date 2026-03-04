import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
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

  const handleDeletarConta = async () => {
    const confirmar = window.confirm("Tem certeza? Isso apagará todos os seus dados permanentemente!");
    
    if (confirmar) {
      try {
        const response = await fetch('/api/deletar', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id }),
        });

        if (response.ok) {
          alert("Conta excluída.");
          localStorage.removeItem('usuarioLogado');
          navigate('/cadastro');
        } else {
          alert("Erro ao excluir conta.");
        }
      } catch (error) {
        alert("Erro na conexão.");
      }
    }
  };

  if (!user) return null;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/home" className="text-blue-500 hover:text-blue-700 font-bold">← Voltar</Link>
          <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Nome</p>
            <p className="text-lg text-gray-800 font-medium">{user.nome}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">E-mail</p>
            <p className="text-lg text-gray-800 font-medium">{user.email || "E-mail não disponível"}</p>
          </div>

          <div className="pt-6">
            <button 
              onClick={handleDeletarConta}
              className="w-full text-red-500 text-sm font-semibold hover:bg-red-50 py-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
            >
              Excluir minha conta permanentemente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}