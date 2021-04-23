import React from "react";
import { Col, ListGroupItem, Row } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

const RankingRow = ({ ranking, index }) => {
  return (
    <Draggable key={ranking.id} draggableId={ranking.id} index={index}>
      {(provided) => (
        <ListGroupItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Row>
            <b>{ranking.name}</b>
          </Row>
          {provided.placeholder}
        </ListGroupItem>
      )}
    </Draggable>
  );
};

export default RankingRow;
