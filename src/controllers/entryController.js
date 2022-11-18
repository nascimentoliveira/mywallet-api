import db from '../db.js';
import dayjs from 'dayjs';

export async function newEntry(req, res) {

  const { authorization } = req.headers;
  const entry = req.body;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(400).send({ message: 'Unexpected header format! Field "authorization" expected.' });

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Token expired, please login again!' });
    }

    await db.collection('entries').insertOne({
      userId: user._id,
      date: dayjs().format('DD:MM:YY'),
      ...entry
    });

  } catch (err) {
    console.error(MESSAGE_ERROR, err);
    res.status(500).send({ message: MESSAGE_ERROR, error: err });
  }

  return;
}

export async function editEntry(req, res) {

  const { authorization } = req.headers;
  const entryID = req.params.ID;
  const newEntry = req.body;
  const token = authorization?.replace('Bearer ', '');
  
  if (!token) return res.status(400).send({ message: 'Unexpected header format! Field "authorization" expected.' });

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Token expired, please login again!' });
    }

    const entry = await db.collection('entries').findOne({ _id: new ObjectId(entryID) });

    if (!entry)
      return res.status(404).send({ message: 'Entry not found!' });

    if (entry.userId !== session.userId)
      return res.status(401).send({ message: 'Operation not allowed!' });

    await db.collection('entries').updateOne({ 
      _id: entry._id }, { 
      $set: { 
        value: newEntry.value, 
        description: newEntry.description
      } 
    });

    res.status(200).send({ message: 'Entry updated successfully!' });

  } catch (err) {
    console.error(MESSAGE_ERROR, err);
    res.status(500).send({ message: MESSAGE_ERROR, error: err });
  }

  return;
}

export async function deleteEntry(req, res) {

  const { authorization } = req.headers;
  const entryID = req.params.ID;
  const token = authorization?.replace('Bearer ', '');
  
  if (!token) return res.status(400).send({ message: 'Unexpected header format! Field "authorization" expected.' });

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Token expired, please login again!' });
    }

    const entry = await db.collection('entries').findOne({ _id: new ObjectId(entryID) });

    if (!entry)
      return res.status(404).send({ message: 'Entry not found!' });

    if (entry.userId !== session.userId)
      return res.status(401).send({ message: 'Operation not allowed!' });

    await db.collection('entries').deleteOne({ _id: entry._id });
    res.status(200).send({ message: 'Entry deleted successfully!' })

  } catch (err) {
    console.error(MESSAGE_ERROR, err);
    res.status(500).send({ message: MESSAGE_ERROR, error: err });
  }

  return;
}