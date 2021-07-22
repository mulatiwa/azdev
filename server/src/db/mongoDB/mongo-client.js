import mongodb from 'mongodb';
import { mongoURI } from '../../config/server-config.js';
import data from './data/data.js';
import { collectionName, dbName } from './mongo.config.js';
const { MongoClient } = mongodb;

export default async  () =>
{
  const mongoClient = new MongoClient( mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    );// Create a new MongoClient

  try
  {
    // Connecting to client
    await mongoClient.connect();// Connect the mongo client to the server    
    
    const mdb = mongoClient.db();
    
    // Test the connection
    await mongoClient.db("admin").command({ ping: 1 });// Establish and verify connection
    const collections = await mdb.collections();
    console.log(` Connected successfully to the MongoDB Server | Collections count:
    ${collections.length} `
    );

/*     // Connecting to database
    const db = mongoClient.db(dbName);//database
    const collection = db.collection(collectionName);//collection

    
    //  Inserting Documents
      // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };    
    const result = await collection.insertMany(data, options);
    console.log(` Documents inserted: ${result.insertedCount}}`);//  print the number of documents inserted */

    return{
      mdb,
      mdbClose: async () => await mongoClient.close(),// Ensures that the client will close when you finish
    }

  } catch (err) {
    const errorReport =
    {
      time: new Date().toLocaleTimeString(),
      message: err.message,
      stack: err.stack,
      reason: err.reason,
      locations: err.locations,
      path: err.path,      
    };
    console.error('Error in MongoDB Client', errorReport);
    process.exit(1);
  }
};

 