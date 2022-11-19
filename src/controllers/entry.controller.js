import { entriesCollection } from '../database/db.js';
import dayjs from 'dayjs';

export async function newEntry(req, res) {
  const entry = res.locals.entry;
  const user = res.locals.user;

  try {
    await entriesCollection.insertOne({
      userId: user.userId,
      date: dayjs().format('DD/MM/YY'),
      description: entry.description,
      value: entry.value,
      type: entry.type,
    });

    res.status(201).send({ message: 'Entry created successfully!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}

export async function editEntry(req, res) {
  const newEntry = res.locals.entry;
  const entryId = res.locals.entryId;

  try {
    await entriesCollection.updateOne({
      _id: entryId
    }, {
      $set: {
        value: newEntry.value,
        description: newEntry.description
      }
    });

    res.status(200).send({ message: 'Entry updated successfully!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}

export async function deleteEntry(req, res) {
  const entryId = res.locals.entryId;

  try {
    await entriesCollection.deleteOne({ _id: entryId });
    res.status(200).send({ message: 'Entry deleted successfully!' })

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'An error has occurred', error: `${err}` });
  }

  return;
}