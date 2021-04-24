import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import RankingRow from "./RankingRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8080/ranking`,
});

const RankingList = () => {
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const [rankingName, setRankingName] = useState("");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(rankings);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setRankings(newItems);
  };

  const addRanking = async (e) => {
    e.preventDefault();
    if (rankingName) {
      const ranking = {
        name: rankingName,
      };
      const result = await api.post("/", ranking);
      if (result && result.data) {
        setRankingName("");
        setRankings([
          ...rankings,
          { ...result.data, id: result.data.id.toString() },
        ]);
      }
    }
  };

  const getRankings = async () => {
    let data = await api.get("/getAll").then(({ data }) => data);
    data = data.map((ranking) => {
      return { ...ranking, id: ranking.id.toString() };
    });
    setLoading(false);
    setRankings(data);
    console.log(rankings);
  };

  useEffect(() => {
    getRankings();
  }, []);

  return (
    <Container>
      <Card style={{ marginTop: "5rem" }}>
        <h1 className="text-center">Rankings</h1>
        {loading ? (
          "Loading..."
        ) : (
          <div>
            <Form className="mb-2 ml-2 mr-2" onSubmit={addRanking}>
              <div className="form-row">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={rankingName}
                  onChange={(e) => setRankingName(e.target.value)}
                />
                <Button type="submit">Add</Button>
              </div>
            </Form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="rankings">
                {(provided) => (
                  <ListGroup
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {rankings.map((ranking, index) => {
                      return (
                        <RankingRow
                          ranking={ranking}
                          index={index}
                          api={api}
                          setRankings={setRankings}
                          rankings={rankings}
                        />
                      );
                    })}
                  </ListGroup>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default RankingList;
