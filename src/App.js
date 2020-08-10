import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import ItemList from './ItemList.jsx'
import AddItemButton from './AddItemButton.jsx'
import { addItem, updateItem, deleteItem } from './actions/items.js'
import Container from 'react-bootstrap/Container'
import Logo from './white-logo.png';

const App = () => {
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();
  const onAddItem = () => dispatch(addItem());
  const onCompleteClick = (uuid, complete) => dispatch(updateItem(uuid, { complete }));
  const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, { text }));
  const onDeleteClick = (uuid) => dispatch(deleteItem(uuid));

  return (
    <div className="App">
      <img src={Logo} alt="WorkPatterns" className="Logo" />

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <ItemList items={items.filter(item => !item.complete)} onCompleteClick={onCompleteClick} onItemTextChange={onItemTextChange} onDeleteClick={onDeleteClick} />
        <div className="border-top mt-3">
          <AddItemButton onAddItem={onAddItem} />
        </div>
      </Container>

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <ItemList items={items.filter(item => item.complete).sort((a,b) => b.dateCompleted - a.dateCompleted)} onCompleteClick={onCompleteClick} onItemTextChange={onItemTextChange} onDeleteClick={onDeleteClick} />
      </Container>
    </div>
  );
}

export default App;
