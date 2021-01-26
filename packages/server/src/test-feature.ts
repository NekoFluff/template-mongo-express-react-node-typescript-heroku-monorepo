import { MongoClient } from "mongodb";
import { Item } from "@monorepo/common";
import ItemRepository from "./repos/ItemRepository";
import MongoConnector from "./mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {
  let itemRepository = new ItemRepository();
  let item = new Item();
  item._id = "Item";
  item.Name = "Item Name";
  item["Drop Rate"] = 0.69;

  let result = await itemRepository.insertItems([item]);
  console.log(result);
  result = await itemRepository.getItems();
  console.log(result);
  MongoConnector.mongodbClient.close();
});
