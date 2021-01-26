import React from "react";
import { Card } from "react-bootstrap";
import { Item } from "@monorepo/common";

type ItemProps = {
  item: Item;
};

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  return (
    <Card>
      <Card.Title>{`_id: ${item._id}`}</Card.Title>
      <Card.Text>{`Name: ${item.Name}`}</Card.Text>
      <Card.Text>{`Drop Rate: ${item["Drop Rate"]}`}</Card.Text>
    </Card>
  );
};

export default ItemCard;
