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

  const dados = { nome, email, senha };

  try {
    const response = await fetch('/api/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Criar Conta</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nome" placeholder="Nome Completo" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="confirmaSenha" type="password" placeholder="Confirme a Senha" onChange={handleChange} className="w-full p-2 border rounded" required />

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold">
            Finalizar Cadastro
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
  Já tem uma conta? 
  <Link to="/login" className="text-blue-500 hover:underline ml-1">
    Faça Login
  </Link>
</p>
      </div>
    </div>
  );
}