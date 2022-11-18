import entrySchema from '../schemas/entrySchema';

export function entrySchemaValidationMiddleware(req, res, next) {
  const entry = req.body;

  const validation = entrySchema.validate(entry, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send({ message: 'Unexpected format!', errors: errors });
  }

  next();
}