import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Container,
  ListGroup,
  Form,
  Col,
  Button,
  Row,
} from "react-bootstrap";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./components/Item";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8080/item`,
});

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

function Ranking() {
  const { rankingId } = useParams();

  const [items, setItems] = useState({});
  const { data, loading } = useFetch(
    "http://localhost:8080/ranking?rankingId=" + rankingId
  );
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    newItems.map((item, index) => {
      item.position = index + 1;
    });

    setItems(newItems);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (newName) {
      const item = {
        position: items.length + 1,
        name: newName,
        description: newDescription,
        id: "falseid" + new Date().getTime().toString(),
        ranking: { id: rankingId },
      };
      setItems((items) => {
        return [...items, item];
      });
      setNewName("");
      setNewDescription("");
    }
  };

  const updateItems = async (e) => {
    e.preventDefault();
    let updatedItems = items;
    updatedItems = updatedItems.map((item) => {
      console.log(item);
      if (item.id.startsWith("falseid")) {
        item.id = null;
      } else {
        item.id = parseInt(item.id);
      }
      item.ranking = { id: rankingId };
      return item;
    });

    const result = await api.put("/updateItems", updatedItems);
    if (result.data != null) {
      setItems(
        result.data
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((item) => {
            return { ...item, id: item.id.toString() };
          })
      );
    }
  };

  const displayItems = (e) => {
    e.preventDefault();
    console.log(items);
  };

  useEffect(() => {
    if (data != null && data.items != null) {
      setItems(
        data.items
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((item) => {
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
          <Row>
            <Col>
              <Button onClick={(e) => displayItems(e)}>items</Button>
            </Col>
            <Col>
              <Button onClick={(e) => updateItems(e)}>save</Button>
            </Col>
          </Row>
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

export default Ranking;
