import { ObjectId } from 'mongodb';
import { entriesCollection } from '../database/db.js';

export async function entryValidation(req, res, next) {
  const entryId = req.params.id;
  const user = res.locals.user;

  try {
    const entry = await entriesCollection.findOne({ _id: new ObjectId(entryId) });

    if (!entry)
      return res.status(404).send({ message: 'Registro não encontrado!' });

    if (!entry.userId.equals(user.userId))
      return res.status(403).send({ message: 'Operação não permitida!' });

    res.locals.entryId = entry._id;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  next();

  return;
}