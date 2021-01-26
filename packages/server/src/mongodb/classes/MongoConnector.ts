const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

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
