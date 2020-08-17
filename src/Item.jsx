import React from "react";
import Button from "react-bootstrap/Button";
import { BsCheck, BsTrash } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form'

const Item = ({ item, onCompleteClick, onItemTextChange, onDeleteClick }) => (
  <Row className="mt-3 bg-white">
    <Col>
      <Form.Control
        readOnly={item.complete}
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
        disabled={!item.active}
        variant={item.complete ? "success" : "secondary"}
        data-testid="complete-button"
      >
        <BsCheck />
      </Button>
    </Col>
    <Col md="auto">
      <Button
        onClick={() => onDeleteClick(item.uuid)}
        variant="danger"
        data-testid="delete-button"
      >
        <BsTrash />
      </Button>
    </Col>
  </Row>
);

export default Item;
