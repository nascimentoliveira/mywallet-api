import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../db.js';

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 12);

  try {
    const userExists = await db.collection('users').findOne({ email: user.email });

    if (userExists)
      return res.status(409).send({ message: 'User already exists!' });

    await db.collection('users').insertOne({ ...user, password: passwordHash })

    res.status(201).send({ message: 'User created successfully!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: err });
  }

  return;
}

export async function signIn(req, res) {
  const {email, password} = req.body;
  
  try {
    const user = await db.collection('users').findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      
      await db.collection('sessions').insertOne({ token, userId: user._id });
      
      res.status(200).send(token);

    } else {
      res.status(401).send({ message: 'User not found!' });
    }
  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: err });
  }

  return;
}