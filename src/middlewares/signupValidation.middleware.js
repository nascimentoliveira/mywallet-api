import { usersCollection } from '../database/db';

export async function signupValidation(req, res, next) {
  const user = res.locals.user;

  try {
    const userExists = await usersCollection.findOne({ email: user.email });
    if (userExists)
      return res.status(409).send({ message: 'User already exists!' });

    res.locals.user = userExists;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  next();
}