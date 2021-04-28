import React from "react";
import { Col, ListGroupItem, Row } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";

const Item = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <ListGroupItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Row>
            <Col className="col-sm-1 text-left">{index + 1}</Col>
            <Col className="text-left">
              <Row>
                <b>{item.item.name}</b>
              </Row>
              <Row>{item.item.description}</Row>
            </Col>
          </Row>
          {provided.placeholder}
        </ListGroupItem>
      )}
    </Draggable>
  );
};

export default Item;
