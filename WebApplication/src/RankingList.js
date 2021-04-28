import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup } from "react-bootstrap";
import RankingRow from "./RankingRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Link, useParams } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8080/ranking`,
});

const RankingList = () => {
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const [rankingName, setRankingName] = useState("");
  const { rankingGroupId } = useParams();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const newRankings = Array.from(rankings);
    const [reorderedRanking] = newRankings.splice(result.source.index, 1);
    newRankings.splice(result.destination.index, 0, reorderedRanking);
    newRankings.map((ranking, index) => {
      ranking.position = index + 1;
    });

    setRankings(newRankings);
  };

  const addRanking = async (e) => {
    e.preventDefault();
    if (rankingName) {
      const ranking = {
        name: rankingName,
        rankingGroup: {
          id: rankingGroupId,
        },
        position: rankings.length + 1,
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

  const updateRankings = async (e) => {
    e.preventDefault();
    let updatedRankings = rankings;
    updatedRankings = updatedRankings.map((ranking) => {
      ranking.id = parseInt(ranking.id);
      return ranking;
    });
    const result = await api.put("/updateRankings", updatedRankings);
    if (result.data != null) {
      setRankings(
        result.data
          .sort((a, b) => (a.position > b.position ? 1 : -1))
          .map((item) => {
            return { ...item, id: item.id.toString() };
          })
      );
    }
  };

  const getRankings = async () => {
    let data = await api
      .get("/getAllInGroup?rankingGroupId=" + rankingGroupId)
      .then(({ data }) => data);
    data = data.map((ranking) => {
      return { ...ranking, id: ranking.id.toString() };
    });
    setLoading(false);
    data = data
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((ranking) => {
        return { ...ranking, id: ranking.id.toString() };
      });
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
            <Link to={`/`}>Back</Link>
            <Button onClick={(e) => updateRankings(e)}>Save</Button>
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
