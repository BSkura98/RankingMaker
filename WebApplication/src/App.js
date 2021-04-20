import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./components/Item";

const finalItems = [
  {
    id: "1",
    name: "Item 1",
    description: "This is description. This is description.",
  },
  {
    id: "2",
    name: "Item 2",
    description: "This is description. This is description.",
  },
  {
    id: "3",
    name: "Item 3",
    description: "This is description. This is description.",
  },
  {
    id: "4",
    name: "Item 4",
    description: "This is description. This is description.",
  },
  {
    id: "5",
    name: "Item 5",
    description: "This is description. This is description.",
  },
];

function App() {
  const [items, setItems] = useState(finalItems);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <div className="App">
      <Container>
        <Card style={{ marginTop: "5rem" }}>
          <h1 className="text-center">Ranking</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
                  {items.map((item, index) => {
                    return <Item item={item} index={index} />;
                  })}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </Card>
      </Container>
    </div>
  );
}

export default App;
