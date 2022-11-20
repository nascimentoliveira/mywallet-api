import { userSchemaSignUp, userSchemaSignIn } from '../models/user.model.js';

export function userSchemaValidationSignIn(req, res, next) {
  const user = req.body;

  const { error } = userSchemaSignIn.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: 'Formato inesperado!', errors: errors });
  }

  res.locals.user = user;

  next();

  return;
}

export function userSchemaValidationSignUp(req, res, next) {
  const user = req.body;

  const { error } = userSchemaSignUp.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ message: 'Formato inesperado!', errors: errors });
  }

  res.locals.user = user;

  next();

  return;
}