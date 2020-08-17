import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { BsPlus } from 'react-icons/bs';

const addItemPropTypes = {
  onAddItem: PropTypes.func.isRequired,
  children: PropTypes.node,
  variant: PropTypes.string,
};

const AddItemButton = ({ onAddItem, children, variant = "primary" }) => (
  <Button onClick={() => onAddItem()} className="mt-3" variant={variant}>
    <BsPlus/> {children}
  </Button>
);

AddItemButton.propTypes = addItemPropTypes;

export default AddItemButton;
