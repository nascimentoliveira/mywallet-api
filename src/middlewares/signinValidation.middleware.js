import { usersCollection } from '../database/db';
import bcrypt from 'bcrypt';

export async function signinValidation(req, res, next) {
  const { email, password } = res.locals.user;

  try {
    const userExists = await usersCollection.findOne({ email: email });
    if (!userExists)
      return res.sendStatus(401);

    const passwordOk = bcrypt.compareSync(password, userExists.password);

    if (!passwordOk) {
      return res.sendStatus(401);
    }

    res.locals.user = userExists;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  next();
}