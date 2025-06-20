// //const { MongoClient } = require("mongodb");
// import { MongoClient,ServerApiVersion } from "mongodb";
// const MONGODB_DB = "Nine";
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority&appName=Clu`;
// console.log(uri);

// if (!uri) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local",
//   );
// }
// if (!MONGODB_DB) {
//   throw new Error(
//     "Please define the MONGODB_DB environment variable inside .env.local",
//   );
// }

// // const uri =
// //   "mongodb+srv://Nine:<db_password>@clu.a6xvoov.mongodb.net/?retryWrites=true&w=majority&appName=Clu";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// export async function runDb() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("Recipes").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// export const connectToDatabase = async () => {
//   // console.log("here");
//   let cached = {};
//   const conn = {};
//   const opts = {
//     MaxPoolSize: 10,
//   };
//   // console.log("conecting");
//   const promise = MongoClient.connect(uri, opts)
//     .then((client) => {
//       conn.client = client;
//       const db = client.db(MONGODB_DB);
//       // console.log(db, "conected");
//       return db;
//     })
//     .then((db) => {
//       conn.db = db;
//       const recipes = db.collection("Recipes");
//       cached.conn = conn;
//     });
//   await promise;
//   // console.log(promise, cached);
//   return cached;
// };
import { MongoClient, ServerApiVersion } from "mongodb";
console.log(
  "username and password",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
);

// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://Nine:${process.env.DB_PASSWORD}@clu.a6xvoov.mongodb.net/?retryWrites=true&w=majority&appName=Clu`;
console.log(uri);
const MONGODB_DB = "module"; // Replace with your DB name

// Caching the connection to reuse it across multiple requests (like in serverless environments)
let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB
export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    // Return cached connection if available
    return { client: cachedClient, db: cachedDb };
  }

  // Create a new client if not already cached
  const client = new MongoClient(uri, {
    maxPoolSize: 8, // Set pool size to 10 (adjust based on your needs)
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    // Connect the client to the server
    // await client.connect();
    // console.log(client);

    // Ping the database to confirm connection
    // await client.db(MONGODB_DB).command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!",
    // );

    // Cache the client and database for reuse
    cachedClient = client;
    cachedDb = client.db("Delicipes");
    // console.log(cachedDb);
    // Return the connected client and database
    return { client: cachedClient, db: cachedDb };
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw new Error("Database connection failed");
  } finally {
    client.close();
  }
};
async function insertDocument(collection, document) {
  const db = await connectToDatabase();
  //console.log(db)

  const result = await db.collection(collection).insertOne(document);

  return result;
}

async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
module.exports = { connectToDatabase, insertDocument, getAllDocuments };
