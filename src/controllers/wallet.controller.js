import { entriesCollection } from '../database/db.js';

export async function wallet(req, res) {
  const user = res.locals.user;

  try {
    const entries = await entriesCollection.find({ userId: user.userId }).toArray();
    res.status(200).send(entries.map(entry => ({
      id: entry._id,
      date: entry.date,
      description: entry.description,
      value: entry.value,
      type: entry.type,
    })));

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}