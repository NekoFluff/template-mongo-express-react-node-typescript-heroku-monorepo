import { Item } from "@monorepo/common";
const axios = require("axios").default;

// Make a request for a user with a given ID
export async function getItems(): Promise<Record<string, Item>> {
  const result = await axios.get("/api/items");
  console.log("API Result:");
  console.log(result);
  return result.data;
}
