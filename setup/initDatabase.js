import { MongoClient } from 'mongodb';


const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'template_database';

async function initDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const collections = ['keys', 'error_log', 'system_log', 'dummy_data'];

    for (const name of collections) {
      const collection = db.collection(name);
      await collection.insertOne({ __temp: true });
      await collection.deleteMany({ __temp: true });
      console.log({
        message: `Initialized collection '${name}' in database '${dbName}'.`,
        type: 'database initialization',
        source: 'initDatabase.js'
      });
    }

    // Seed the keys collection
    const keysCollection = db.collection('keys');
    await keysCollection.insertOne({ active: 1, KeyValue: 'testKey' });
    console.log({
      message: `Seeded 'keys' collection with test key in database '${dbName}'.`,
      type: 'database initialization',
      source: 'initDatabase.js'
    });

    console.log({
      message: `Database '${dbName}' initialized successfully.`,
      type: 'database initialization',
      source: 'initDatabase.js'
    });
  } catch (err) {
    console.error({
      message: `Error initializing database: ${err.message}`,
      type: err.name,
      source: 'initDatabase.js',
      stack: err.stack
    });
  } finally {
    await client.close();
  }
}

initDatabase();
