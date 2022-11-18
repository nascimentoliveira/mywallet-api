import { entriesCollection } from '../database/db';
import dayjs from 'dayjs';

export async function newEntry(req, res) {
  const entry = res.locals.entry;
  const user = res.locals.user;

  try {
    await entriesCollection.insertOne({
      userId: user._id,
      date: dayjs().format('DD:MM:YY'),
      ...entry
    });

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  return;
}

export async function editEntry(req, res) {
  const newEntry = res.locals.entry;
  const entryID = res.locals.entryID;

  try {
    await entriesCollection.updateOne({ 
      _id: entryID}, { 
      $set: { 
        value: newEntry.value, 
        description: newEntry.description
      } 
    });

    res.status(200).send({ message: 'Entry updated successfully!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    return res.status(500).send({ message: 'An error has occurred', error: err });
  }

  return;
}

export async function deleteEntry(req, res) {
  const entryID = res.locals.entryID;

  try {
    await db.collection('entries').deleteOne({ _id: entryID });
    res.status(200).send({ message: 'Entry deleted successfully!' })

  } catch (err) {
    console.error(MESSAGE_ERROR, err);
    res.status(500).send({ message: MESSAGE_ERROR, error: err });
  }

  return;
}