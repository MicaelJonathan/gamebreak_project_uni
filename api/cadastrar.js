import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  // Requisições do tipo POST (como um formulário)
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, email, senha } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha, // Hash essa senha no futuro.
      },
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
}