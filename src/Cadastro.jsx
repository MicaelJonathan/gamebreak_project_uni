import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });

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
      body: JSON.stringify({ nome, email, senha }), // Enviando os dados extraídos
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      const erro = await response.json();
      alert("Erro: " + erro.message);
    }
  } catch (error) {
    alert("Erro na conexão com o servidor.");
  }
};

  return (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
    {/* Container principal com largura de celular (max-w-md) */}
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Criar Conta</h2>
        <p className="text-gray-500 mt-2 text-sm">Junte-se à nossa comunidade</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input 
            name="nome" 
            placeholder="Nome Completo" 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
            required 
          />
        </div>
        <div>
          <input 
            name="email" 
            type="email" 
            placeholder="E-mail" 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
            required 
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input 
            name="senha" 
            type="password" 
            placeholder="Senha" 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
            required 
          />
          <input 
            name="confirmaSenha" 
            type="password" 
            placeholder="Confirme a Senha" 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all font-bold text-lg shadow-lg shadow-green-200"
        >
          Finalizar Cadastro
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta? 
          <Link to="/login" className="text-green-600 font-bold hover:underline ml-1">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}