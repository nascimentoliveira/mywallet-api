import { sessionsCollection, usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
  const user = res.locals.user;
  const hashPassword = bcrypt.hashSync(user.password, 12);

  try {
    await usersCollection.insertOne({ ...user, password: hashPassword });
    res.status(201).send({ message: 'User created successfully!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}

export async function signIn(req, res) {
  const user = res.locals.user;
  const token = uuid();

  try {
    await sessionsCollection.insertOne({
      token, 
      userId: user._id ,
      time: Date.now()
    });
    res.status(200).send({ name: user.name, token: token });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}