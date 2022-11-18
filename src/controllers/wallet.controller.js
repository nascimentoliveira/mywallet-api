import { entriesCollection } from '../database/db';

export async function wallet(req, res) {
  const user = res.locals.user;
  
  try {
    const entries = await entriesCollection.find({ userId: user.userId }).toArray();
    res.status(200).send(entries);

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  return;
}