import React from "react";
import { Col, ListGroupItem, Row, Button } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

const Item = ({
  item,
  index,
  api,
  items,
  setItems,
  rankingId = { rankingId },
}) => {
  const deleteRankedItem = async (e) => {
    e.preventDefault();
    let newItems = [...items];
    console.log(items);
    newItems.splice(index, 1);
    newItems.map((item, index) => {
      item.position = index + 1;
      item.ranking = { id: rankingId };
    });
    if (item.id.startsWith("falseid")) {
      setItems(newItems);
      return;
    }
    const result = await api.put(`/delete?rankedItemId=${item.id}`, newItems);
    console.log(result);
    if (result.status === 200) {
      setItems(newItems);
    }
  };

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
            <Button
              className="btn btn-danger ml-4"
              onClick={(e) => deleteRankedItem(e)}
            >
              Delete
            </Button>
            <Link
              className="btn btn-primary ml-2"
              to={`/itemStatistics/${item.item.id}`}
            >
              Statistics
            </Link>
          </Row>
          {provided.placeholder}
        </ListGroupItem>
      )}
    </Draggable>
  );
};

export default Item;
