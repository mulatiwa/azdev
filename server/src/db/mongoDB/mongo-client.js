import { MongoClient } from 'mongodb';
import { mongoURI } from '../../config/server-config.js';
import data from './data/data.js';
import { collectionName, dbName } from './mongo.config.js';

export default async  (uri, database, nameCollection, dbData) =>
{
  const mongoClient = new MongoClient(
    uri,
    {useUnifiedTopology: true}
    );// Create a new MongoClient

  try
  {
    // Connecting to client
    await mongoClient.connect();// Connect the mongo client to the server    
    await client.db("admin").command({ ping: 1 });// Establish and verify connection
    console.log('Connected successfully to the MongoDB Server');

    // Connecting to database
    const db = mongoClient.db(database);//database
    const collection = db.collection(nameCollection);//collection
    
    //  Inserting Documents
      // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };

    const result = await collection.insertMany(dbdata, options);
    console.log(`${result.insertedCount} documents were inserted`);//  print the number of documents inserted

    return{
      db,
      collection,
      mongoClose: async => await mongoClient.close(),// Ensures that the client will close when you finish
    }

  } catch (err) {
    console.log(err.stack);
  }
};

 mongoDBServer(mongoURI, dbName, collectionName, data)
 