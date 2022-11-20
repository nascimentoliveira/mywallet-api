import { usersCollection } from '../database/db.js';

export async function signUpValidation(req, res, next) {
  const user = res.locals.user;

  try {
    const userExists = await usersCollection.findOne({ email: user.email });
    if (userExists)
      return res.status(409).send({ message: 'Já existe usuário cadastrado com este e-mail!' });

    user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
    
    res.locals.user = user;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  next();

  return;
}