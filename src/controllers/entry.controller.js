import { entriesCollection } from '../database/db.js';
import dayjs from 'dayjs';

export async function newEntry(req, res) {
  const entry = res.locals.entry;
  const user = res.locals.user;

  try {
    await entriesCollection.insertOne({
      userId: user.userId,
      date: dayjs().format('DD/MM'),
      description: entry.description,
      value: entry.value,
      type: entry.type,
    });
    res.status(201).send({ message: 'Registro criado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
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
    res.status(200).send({ message: 'Registro atualizado com sucesso!!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}

export async function deleteEntry(req, res) {
  const entryId = res.locals.entryId;

  try {
    await entriesCollection.deleteOne({ _id: entryId });
    res.status(200).send({ message: 'Registro deletado com sucesso!' });

  } catch (err) {
    console.error('An error has occurred: ', err);
    res.status(500).send({ message: 'Ocorreu um erro!', error: `${err}` });
  }

  return;
}