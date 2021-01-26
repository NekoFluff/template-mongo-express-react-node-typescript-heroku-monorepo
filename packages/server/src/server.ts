const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

import { MongoClient } from "mongodb";
import { Item } from "@monorepo/common";
import ItemRepository from "./repos/ItemRepository";
import MongoConnector from "./mongodb/classes/MongoConnector";

MongoConnector.connectToMongo(async (client: MongoClient) => {
  const itemRepository = new ItemRepository();
  let items = await itemRepository.getItems();

  if (Object.keys(items).length == 0) {
    let item = new Item();
    item._id = "Test Item";
    item.Name = "Test Item Name";
    item["Drop Rate"] = 0.69;

    const result = await itemRepository.insertItems([item]);
    console.log(`Test Item insertion result:`);
    console.log(result);
  }
});

require("dotenv").config();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/items", async (req: any, res: any) => {
  res.send(
    "Go to /items to get some data from sample item data from your mongodb database. This was inserted when the server started."
  );
});

app.get("/items", async (req: any, res: any) => {
  const itemRepository = new ItemRepository();
  let items = await itemRepository.getItems();
  res.send(items);
});

app.post("/items", async (req: any, res: any) => {
  const itemRepository = new ItemRepository();
  const result = await itemRepository.insertItems([req.body as Item]);
  res.send(result);
});

const port = process.env.PORT || 8080;
console.log(`Now running on port ${port}`);

app.listen(port);
