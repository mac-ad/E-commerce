// src/lib/db.ts

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

let client: MongoClient;
let db: Db;

try {
  // Create a new MongoClient
  client = new MongoClient(uri, options);
  
  // Connect to MongoDB
  client.connect()
    .then(() => {
      console.log('Connected successfully to MongoDB');
      db = client.db("myDb");
    })
    .catch(error => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    client.close().then(() => {
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  });

} catch (error) {
  console.error('Error initializing MongoDB:', error);
  process.exit(1);
}

export default {db : client};
