import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsPlus } from 'react-icons/bs';

const AddItemButton = ({ onAddItem }) => (
  <Button onClick={() => onAddItem()} className="mt-3">
    <BsPlus/> Add discussion topic
  </Button>
);

export default AddItemButton;
