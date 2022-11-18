import { sessionsCollection } from '../database/db';

export async function authValidation (req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) 
    return res.status(400).send({ message: 'Unexpected header format! Field "authorization" expected.' });

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Token expired, please login again!' });
    }
    
    res.locals.user = session;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  next();
}