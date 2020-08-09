import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import ItemList from './ItemList.jsx'
import AddItemButton from './AddItemButton.jsx'
import { addItem, updateItem } from './actions/items.js'
import Container from 'react-bootstrap/Container'
import Logo from './white-logo.png';

const App = () => {
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();
  const onAddItem = () => dispatch(addItem());
  const onCompleteClick = (uuid, complete) => dispatch(updateItem(uuid, { complete }));
  const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, { text }));

  return (
    <div className="App">
      <img src={Logo} alt="WorkPatterns" className="Logo" />

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <ItemList items={items} onCompleteClick={onCompleteClick} onItemTextChange={onItemTextChange} />
        <div className="border-top mt-3">
          <AddItemButton onAddItem={onAddItem}/>
        </div>
      </Container>
    </div>
  );
}

export default App;
