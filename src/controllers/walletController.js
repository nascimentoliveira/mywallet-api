import db from '../db.js';

export async function wallet(req, res) {

  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(400).send({ message: 'Unexpected header format! Field "authorization" expected.' });

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return res.status(401).send({ message: 'Token expired, please login again!' });
    }

    const user = await db.collection('users').findOne({
      _id: session.userId
    })

    const entries = await db.collection('entries').find({ 
      userId: user._id }).toArray();
    res.status(200).send(entries);

  } catch (err) {
    console.error(MESSAGE_ERROR, err);
    res.status(500).send({ message: MESSAGE_ERROR, error: err });
  }

  return;
}