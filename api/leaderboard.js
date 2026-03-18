import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // ROTA PARA SALVAR SCORE (POST)
  if (req.method === 'POST') {
    const { usuario_id, nome, pontuacao } = req.body;

    if (!usuario_id || !nome || pontuacao === undefined) {
      return res.status(400).json({ message: "Dados incompletos." });
    }

    try {
      const novoScore = await prisma.leaderboard.create({
        data: {
          usuario_id: parseInt(usuario_id),
          nome_usuario: nome,
          pontuacao: parseInt(pontuacao),
        },
      });
      return res.status(201).json(novoScore);
    } catch (error) {
      console.error("Erro no Prisma:", error);
      return res.status(500).json({ error: "Erro ao salvar no banco." });
    }
  } 

  // ROTA PARA BUSCAR RANKING (GET)
  else if (req.method === 'GET') {
    try {
      const ranking = await prisma.leaderboard.findMany({
        take: 10, // Top 10
        orderBy: {
          pontuacao: 'desc',
        },
      });
      return res.status(200).json(ranking);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar ranking." });
    }
  } 

  // Se tentarem outro método (PUT, DELETE, etc)
  else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}