import React from "react";
import { Col, ListGroupItem, Row, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const RankingRow = ({ ranking, index, api, setRankings, rankings }) => {
  const deleteRanking = async (e) => {
    e.preventDefault();
    const result = await api.delete(`?rankingId=${ranking.id}`);
    console.log(result);
    if (result.status === 200) {
      let newRankings = [...rankings];
      newRankings.splice(index, 1);
      setRankings(newRankings);
    }
  };

  return (
    <Draggable key={ranking.id} draggableId={ranking.id} index={index}>
      {(provided) => (
        <ListGroupItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Row>
            <Col>
              <b>{ranking.name}</b>
            </Col>
            <Col>
              <Link to={`/ranking/${ranking.id}`}>Open</Link>
              <Button className="btn btn-danger ml-4" onClick={deleteRanking}>
                Delete
              </Button>
            </Col>
          </Row>
          {provided.placeholder}
        </ListGroupItem>
      )}
    </Draggable>
  );
};

export default RankingRow;
