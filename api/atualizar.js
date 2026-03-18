import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id, novoNome } = req.body;

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome: novoNome },
    });

    return res.status(200).json({ 
      message: 'Nome atualizado com sucesso!', 
      usuario: usuarioAtualizado 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar nome.' });
  }
}