import { sessionsCollection } from '../database/db.js';

export async function authValidation(req, res, next) {
  const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token)
    return res.status(400).send({ message: 'Formato de cabeçalho inesperado! Campo "Authorization" não encontrado.' });

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session)
      return res.status(401).send({ message: 'Entre com sua conta!' });

    if (Date.now() - session.time > TOKEN_EXPIRATION_TIME) {
      await sessionsCollection.deleteOne({ _id: session._id });
      return res.status(401).send({ message: 'Token expirado, faça o login novamente!' });
    }

    res.locals.user = session;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  next();

  return;
}