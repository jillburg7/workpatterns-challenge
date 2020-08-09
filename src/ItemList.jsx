import React from 'react';
import Item from './Item.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemList = ({ items, onCompleteClick, onItemTextChange }) => {
  return (<>
    {items.length === 0 && (
      <Row className="p-4 text-center">
        <Col className="text-muted">
          You don't have any discussion topics yet
        </Col>
      </Row>
    )}
    {items.map((item) => (
      <Item key={item.uuid} item={item} onCompleteClick={onCompleteClick} onItemTextChange={onItemTextChange} />
    ))}
  </>);
};

export default ItemList;
