import { MongoDBDocument } from "./MongoDBTypes";

export class Item implements MongoDBDocument {
  ["_id"]: string;
  ["Name"]: string;
  ["Drop Rate"]: number;
}
