import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./components/Item";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  }, []);

  return { data, loading };
};

function App() {
  const [items, setItems] = useState({});
  const { data, loading } = useFetch(
    "http://localhost:8080/ranking?rankingId=1"
  );

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  useEffect(() => {
    if (data != null) {
      setItems(
        data.items.map((item) => {
          return { ...item, id: item.id.toString() };
        })
      );
    }
  }, [data]);

  return (
    <div className="App">
      <Container>
        <Card style={{ marginTop: "5rem" }}>
          <h1 className="text-center">Ranking</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="items">
                {(provided) => (
                  <ListGroup
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {items.map((item, index) => {
                      return <Item item={item} index={index} />;
                    })}
                  </ListGroup>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default App;
