import "./App.css";
import { Container } from "react-bootstrap";
import ItemCard from "./components/ItemCard";
import { getItems } from "./api/itemAPI";
import { Item } from "@monorepo/common";
import { useEffect, useState } from "react";

function App() {
  // Store items in state
  const [items, setItems] = useState<Item[]>([]);

  // Get items when the app is rendered
  useEffect(() => {
    async function getValues() {
      const items = await getItems();
      setItems(Object.values(items));
    }

    getValues();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          {items.map((item) => {
            return <ItemCard key={item._id} item={item}></ItemCard>;
          })}
        </Container>
      </header>
    </div>
  );
}

export default App;
