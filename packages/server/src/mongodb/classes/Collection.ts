import MongoConnector from "./MongoConnector";
import ICollection from "../interfaces/ICollection";
import { Instantiable, MongoDBDocument } from "@monorepo/common";

export default class Collection<T extends MongoDBDocument>
  implements ICollection<T> {
  db = "princess-connect-redive";
  collection = "temp-collection";
  classType: Instantiable<T>;

  constructor(db: string, collection: string, classType: Instantiable<T>) {
    this.db = db;
    this.collection = collection;
    this.classType = classType;
  }

  getConnection(): any {
    return MongoConnector.mongodbClient.db(this.db).collection(this.collection);
  }

  create(items: T[]): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async find<T2 = T>(
    filter: any,
    overrideClassType?: Instantiable<T2>
  ): Promise<Record<string, T2>> {
    const collection = this.getConnection();
    const result = await collection.find(filter);
    const rawData = await result.toArray();
    return this.dataToObject<T2>(rawData, overrideClassType);
  }

  async aggregate<T2 = T>(
    aggregation: any,
    overrideClassType?: Instantiable<T2>
  ): Promise<Record<string, T2>> {
    const collection = this.getConnection();
    const result = await collection.aggregate(aggregation);
    const rawData = await result.toArray();
    return this.dataToObject<T2>(rawData, overrideClassType);
  }

  async update(items: T[], upsert = false): Promise<any> {
    const collection = this.getConnection();
    const options = { ordered: true };

    const bulkWriteOperations = items.map((item) => {
      return {
        replaceOne: {
          filter: { _id: item._id },
          replacement: item,
          upsert: upsert,
        },
      };
    });

    return await collection.bulkWrite(bulkWriteOperations, options);
  }

  delete(filter: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  dataToObject<T2 = T>(
    rawData: any,
    overrideClassType?: Instantiable<T2>
  ): Record<string, T2> {
    let dataArray = JSON.parse(JSON.stringify(rawData));
    let dataObjects: any = {};

    const x = overrideClassType || this.classType;
    dataArray.map(function (obj: any) {
      dataObjects[obj["_id"]] = Object.assign(new x(), obj);
    });

    return dataObjects;
  }
}
