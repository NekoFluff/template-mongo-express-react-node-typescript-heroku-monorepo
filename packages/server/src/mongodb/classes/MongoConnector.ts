const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export default class MongoConnector {
  static mongodbClient: any;

  static connectToMongo(callback: (client: any) => void) {
    const mongoClientOptions = {
      poolSize: 50,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    MongoClient.connect(
      process.env.MONGO_CONNECTION_URL,
      mongoClientOptions,
      function (connectErr: Error, client: any) {
        assert.equal(null, connectErr);
        MongoConnector.mongodbClient = client;

        console.log("Connected to MongoDB");
        callback(client);
      }
    );
  }
}
