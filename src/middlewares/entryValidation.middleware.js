import { entriesCollection } from '../database/db';

export async function entryValidation (req, res, next) {
  const entryID = req.params.ID;
  const user = res.locals.user;

  try {
    const entry = await entriesCollection.findOne({ _id: new ObjectId(entryID) });

    if (!entry)
      return res.status(404).send({ message: 'Entry not found!' });

    if (entry.userId !== user.userId)
      return res.status(401).send({ message: 'Operation not allowed!' });

    res.locals.entryID = entry._id;

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  next();
}