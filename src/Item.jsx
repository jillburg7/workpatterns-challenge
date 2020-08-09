import React from "react";
import Button from "react-bootstrap/Button";
import { BsCheck } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Item = ({ item, onCompleteClick, onItemTextChange }) => (
  <Row className="mt-3 bg-white">
    <Col>
      <input
        type="text"
        className="form-control"
        placeholder="Enter text here"
        value={item.text}
        onChange={(e) => onItemTextChange(item.uuid, e.target.value )}
      />
    </Col>
    <Col md="auto">
      <Button
        onClick={() => onCompleteClick(item.uuid, !item.complete)}
        variant={item.complete ? "success" : "secondary"}
        data-testid="complete-button"
      >
        <BsCheck />
      </Button>
    </Col>
  </Row>
);

export default Item;
