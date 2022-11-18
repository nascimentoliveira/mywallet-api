import userSchema from '../schemas/userSchema';

export function userSchemaValidationMiddleware(req, res, next) {
  const user = req.body;

  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send({ message: 'Unexpected format!', errors: errors });
  }

  next();
}