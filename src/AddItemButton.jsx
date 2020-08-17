import React from 'react';
import Button from 'react-bootstrap/Button';
import { BsPlus } from 'react-icons/bs';

const AddItemButton = ({ onAddItem, children, variant = "primary" }) => (
  <Button onClick={() => onAddItem()} className="mt-3" variant={variant}>
    <BsPlus/> {children}
  </Button>
);

export default AddItemButton;
