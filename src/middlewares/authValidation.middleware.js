import { sessionsCollection } from '../database/db.js';

export async function authValidation(req, res, next) {
  const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token)
    return res.status(400).send({ message: 'Unexpected header format! Field "Authorization" expected.' });

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Login with your account!' });
    }

    if (Date.now() - session.time > TOKEN_EXPIRATION_TIME) {
      return res.status(401).send({ message: 'Expired token, please login again!' });
    }

    res.locals.user = session;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  next();

  return;
}