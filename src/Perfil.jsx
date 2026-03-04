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
        const data = await response.json();
        const usuarioAtualizado = { ...user, nome: novoNome };
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
        setUser(usuarioAtualizado);
        setEditando(false);
        alert("Nome atualizado!");
      } else {
        alert("Erro ao atualizar o nome.");
      }
    } catch (error) {
      alert("Erro na conexão.");
    }
  };

  const handleDeletarConta = async () => {
    const confirmar = window.confirm("Tem certeza que deseja apagar sua conta?");
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
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/home" className="text-blue-500 hover:text-blue-700 font-bold">← Voltar</Link>
          <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
            <p className="text-xs font-bold text-gray-400 uppercase">Nome</p>
            {editando ? (
              <div className="flex mt-2 gap-2">
                <input 
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button onClick={handleSalvarNome} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">Salvar</button>
                <button onClick={() => setEditando(false)} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-sm">X</button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-lg text-gray-800 font-medium">{user.nome}</p>
                <button onClick={() => setEditando(true)} className="text-blue-600 text-sm font-semibold hover:underline">Alterar</button>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">E-mail</p>
            <p className="text-lg text-gray-800 font-medium">{user.email}</p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button 
              onClick={handleDeletarConta}
              className="w-full text-red-500 text-sm font-semibold hover:bg-red-50 py-2 rounded-lg transition-colors border border-transparent"
            >
              Excluir minha conta permanentemente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}