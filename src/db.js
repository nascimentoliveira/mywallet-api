import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_NAME = 'MyWallet';
let db;
const mongoClient = new MongoClient(process.env.MONGO_URI);

console.log('Trying to connect to the data server...');
await mongoClient.connect()
  .then(() => {
    db = mongoClient.db(DATABASE_NAME);
    console.log('Connection to data server established!');
  })
  .catch(err => {
    return console.log('Failed to connect to database:', err);
  });

export default db;