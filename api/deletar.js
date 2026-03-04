import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.body;

  try {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Conta excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar conta.' });
  }
}