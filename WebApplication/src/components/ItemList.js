import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Col,
  Row,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8080/item`,
});

const ItemList = () => {
  const { rankingGroupId } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    if (newName) {
      const item = {
        name: newName,
        description: newDescription,
        rankingGroup: {
          id: rankingGroupId,
        },
      };
      const result = await api.post("/", item);
      if (result && result.data) {
        setNewName("");
        setNewDescription("");
        setItems([...items, { ...result.data, id: result.data.id.toString() }]);
      }
    }
  };

  const deleteItem = async (e, item, index) => {
    e.preventDefault();
    const result = await api.delete(`?itemId=${item.id}`);
    console.log(result);
    if (result.status === 200) {
      let netItems = [...items];
      netItems.splice(index, 1);
      setItems(netItems);
    }
  };

  const getItems = async () => {
    let data = await api
      .get("/getAllInGroup?rankingGroupId=" + rankingGroupId)
      .then(({ data }) => data);
    data = data.map((item) => {
      return { ...item, id: item.id.toString() };
    });
    setLoading(false);
    setItems(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <Card style={{ marginTop: "5rem" }}>
        <h1 className="text-center">Items</h1>
        {loading ? (
          "Loading..."
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
                <Col className="col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </Col>
                <Button type="submit">Add</Button>
                <Link
                  className="btn btn-secondary ml-5"
                  to={`/rankingGroup/${rankingGroupId}`}
                >
                  Back
                </Link>
              </div>
            </Form>
            <ListGroup>
              {items.map((item, index) => {
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col className="text-left">
                        <Row>
                          <b>{item.name}</b>
                        </Row>
                        <Row>{item.description}</Row>
                      </Col>
                      <Button
                        className="btn btn-danger"
                        onClick={(e) => deleteItem(e, item, index)}
                      >
                        Delete
                      </Button>
                      <Link
                        className="btn btn-primary ml-4"
                        to={`/itemStatistics/${item.id}`}
                      >
                        Statistics
                      </Link>
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ItemList;
