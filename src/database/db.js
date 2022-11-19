import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_NAME = 'MyWallet';

const mongoClient = new MongoClient(process.env.MONGO_URI);

console.log('Trying to connect to the data server...');

try {
  await mongoClient.connect();
  console.log('Connection to data server established!');
} catch (err) {
  console.log('Failed to connect to database:', err);
}

const db = mongoClient.db(DATABASE_NAME);
export const usersCollection = db.collection('users');
export const entriesCollection = db.collection('entries');
export const sessionsCollection = db.collection('sessions');