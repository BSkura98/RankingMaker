import React from "react";
import { Col, ListGroupItem, Row } from "react-bootstrap";

const Item = ({ position, name, description }) => {
  return (
    <ListGroupItem>
      <Row>
        <Col className="col-sm-1 text-left">{position}</Col>
        <Col className="text-left">
          <Row>
            <b>{name}</b>
          </Row>
          <Row>{description}</Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default Item;
