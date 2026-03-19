import {expect, test} from 'vitest';
import handlerAtualizar from './atualizar.js';
import handlerCadastrar from './cadastrar.js';

// TESTE ATUALIZAR NOME
test('atualizar usuário', async () => {
  const req = {
    method: 'PUT',
    body: {
      id: 1,
      novoNome: 'Novo Nome'
    }
  };

  const res = {
    status: (code) => {
      expect(code).toBe(200);
      return res;
    },
    json: (data) => {
      expect(data).toHaveProperty('message', 'Nome atualizado com sucesso!');
      expect(data).toHaveProperty('usuario');
      expect(data.usuario).toHaveProperty('id', 1);
      expect(data.usuario).toHaveProperty('nome', 'Novo Nome');
    }
  };

  await handlerAtualizar(req, res);
});

// TESTE CADASTRAR USUÁRIO
test('cadastrar usuário', async () => {
  const req = {
    method: 'POST',
    body: {
      nome: 'Teste User',
      email: 'teste@example.com',
      senha: 'senha123'
    }
  };

  const res = {
    status: (code) => {
      expect(code).toBe(201);
      return res;
    },
    json: (data) => {
      expect(data).toHaveProperty('message', 'Usuário criado com sucesso!');
      expect(data).toHaveProperty('usuario');
      expect(data.usuario).toHaveProperty('nome', 'Teste User');
      expect(data.usuario).toHaveProperty('email', 'teste@example.com');
    }
  };

  await handlerCadastrar(req, res);
});
