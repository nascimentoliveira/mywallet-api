import { usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';

export async function signInValidation(req, res, next) {
  const { email, password } = res.locals.user;

  try {
    const userExists = await usersCollection.findOne({ email: email });
    if (!userExists)
      return res.status(404).send({ message: 'Usuário não encontrado!' });

    const passwordOk = bcrypt.compareSync(password, userExists.password);

    if (!passwordOk) {
      return res.status(401).send({ message: 'Email e/ou senha inválido!' });
    }

    res.locals.user = userExists;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  next();

  return;
}