import { entrySchema } from '../models/entry.model.js';

export function entrySchemaValidation(req, res, next) {
  const entry = req.body;

  const validation = entrySchema.validate(entry, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(422).send({ message: 'Unexpected format!', errors: errors });
  }

  res.locals.entry = entry;

  next();

  return;
}