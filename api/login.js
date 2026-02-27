import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas POST é permitido' });
  }

  const { email, senha } = req.body;
  const emailLower = email.toLowerCase();

  try {

    const usuario = await prisma.usuario.findUnique({
      where: { email: emailLower },
    });

    if (!usuario) {
      return res.status(404).json({ message: 'E-mail não cadastrado.' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    return res.status(200).json({ 
      message: 'Login bem-sucedido', 
      user: { id: usuario.id, nome: usuario.nome } 
    });

  } catch (error) {
    return res.status(500).json({ message: 'Erro no banco de dados', error: error.message });
  }
}