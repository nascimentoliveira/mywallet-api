import { sessionsCollection, usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
  const ROUNDS = 12;
  const user = res.locals.user;
  const hashPassword = bcrypt.hashSync(user.password, ROUNDS);

  try {
    await usersCollection.insertOne({ ...user, password: hashPassword });
    res.status(201).send({ message: 'Usuário criado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}

export async function signIn(req, res) {
  const user = res.locals.user;
  const token = uuid();

  try {
    await sessionsCollection.insertOne({
      token,
      userId: user._id,
      time: Date.now()
    });
    res.status(200).send({ name: user.name, token: token });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}