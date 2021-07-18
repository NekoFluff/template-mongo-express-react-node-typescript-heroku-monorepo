import Collection from "../mongodb/classes/Collection";
import { Item } from "@monorepo/common";

const fs = require("fs");

export default class ItemRepository extends Collection<Item> {
  constructor() {
    super("sample-db", "items", Item);
  }

  async getItems(): Promise<Record<string, Item>> {
    const filter = {};
    return super.find(filter);
  }

  async insertItems(items: Item[]): Promise<any> {
    return super.create(items);
  }
}
