import React from "react";
import { Col, ListGroupItem, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RankingGroupRow = ({
  rankingGroup,
  index,
  api,
  setRankingGroups,
  rankingGroups,
}) => {
  const deleteRankingGroup = async (e) => {
    e.preventDefault();
    const result = await api.delete(`?rankingGroupId=${rankingGroup.id}`);
    console.log(result);
    if (result.status === 200) {
      let newRankingGroups = [...rankingGroups];
      newRankingGroups.splice(index, 1);
      setRankingGroups(newRankingGroups);
    }
  };

  return (
    <ListGroupItem>
      <Row>
        <Col>
          <b>{rankingGroup.name}</b>
        </Col>
        <Link
          className="btn btn-primary float-right text-center"
          to={`/rankingGroup/${rankingGroup.id}`}
        >
          Open
        </Link>
        <Button
          className="btn btn-danger ml-4"
          onClick={(e) => deleteRankingGroup(e)}
        >
          Delete
        </Button>
      </Row>
    </ListGroupItem>
  );
};

export default RankingGroupRow;
