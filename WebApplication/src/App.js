import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, ListGroup, Form, Col, Button } from "react-bootstrap";
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
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newName) {
      const item = {
        position: items.length,
        name: newName,
        description: newDescription,
        id: new Date().getTime().toString(),
      };
      setItems((items) => {
        return [...items, item];
      });
      setNewName("");
      setNewDescription("");
    }
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
            <div>
              <Form className="mb-2 ml-2 mr-2" onSubmit={addItem}>
                <div className="form-row">
                  <Col>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </Col>
                  <Col className="col-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </Col>
                  <Button type="submit">Add</Button>
                </div>
              </Form>
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
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default App;
