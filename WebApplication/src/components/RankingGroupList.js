import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, ListGroup, Col } from "react-bootstrap";
import RankingGroupRow from "./RankingGroupRow";

const api = axios.create({
  baseURL: `http://localhost:8080/rankingGroup`,
});

const RankingGroupList = () => {
  const [loading, setLoading] = useState(true);
  const [rankingGroups, setRankingGroups] = useState([]);
  const [rankingGroupName, setRankingGroupName] = useState("");

  const addRankingGroup = async (e) => {
    e.preventDefault();
    if (rankingGroupName) {
      const rankingGroup = {
        name: rankingGroupName,
      };
      const result = await api.post("/", rankingGroup);
      if (result && result.data) {
        setRankingGroupName("");
        setRankingGroups([
          ...rankingGroups,
          { ...result.data, id: result.data.id.toString() },
        ]);
      }
    }
  };

  const getRankingGroups = async () => {
    let data = await api.get("/getAll").then(({ data }) => data);
    data = data.map((rankingGroup) => {
      return { ...rankingGroup, id: rankingGroup.id.toString() };
    });
    setLoading(false);
    setRankingGroups(data);
  };

  useEffect(() => {
    getRankingGroups();
  }, []);

  return (
    <Container>
      <Card style={{ marginTop: "5rem" }}>
        <h1 className="text-center">Ranking groups</h1>
        {loading ? (
          "Loading..."
        ) : (
          <div>
            <Form className="mb-2 ml-2 mr-2" onSubmit={addRankingGroup}>
              <div className="form-row">
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={rankingGroupName}
                    onChange={(e) => setRankingGroupName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button type="submit">Add</Button>
                </Col>
              </div>
            </Form>
            <ListGroup>
              {rankingGroups.map((rankingGroup, index) => {
                return (
                  <RankingGroupRow
                    rankingGroup={rankingGroup}
                    index={index}
                    api={api}
                    setRankingGroups={setRankingGroups}
                    rankingGroups={rankingGroups}
                    key={index}
                  ></RankingGroupRow>
                );
              })}
            </ListGroup>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default RankingGroupList;
