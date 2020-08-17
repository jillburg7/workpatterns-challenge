import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';
import ItemList from './ItemList.jsx'
import AddItemButton from './AddItemButton.jsx'
import { addItem, updateItem, toggleItem, deleteItem, addSubItem, updateSubItem, toggleSubItem, deleteSubItem } from './actions/items.js'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Logo from './white-logo.png';

const App = () => {
  const { items } = useSelector(state => state);
  const dispatch = useDispatch();
  const onAddItem = () => dispatch(addItem());
  const onCompleteClick = (uuid, complete) => dispatch(toggleItem(uuid, complete));
  const onItemTextChange = (uuid, text) => dispatch(updateItem(uuid, { text }));
  const onDeleteClick = (uuid) => dispatch(deleteItem(uuid));
  const onAddSubItem = (uuid) => dispatch(addSubItem(uuid));
  const onUpdateSubItem = (uuid, updatedSubItem) => dispatch(updateSubItem(uuid, updatedSubItem));
  const onCompleteSubItem = (uuid, updatedSubItem) => dispatch(toggleSubItem(uuid, updatedSubItem));
  const onSubItemDeleteClick = (uuid, subItemUuid) => dispatch(deleteSubItem(uuid, subItemUuid));
  
  return (
    <div className="App">
      <img src={Logo} alt="WorkPatterns" className="Logo" />

      <Container className="bg-white px-4 py-3 rounded shadow-lg">
        <Tabs defaultActiveKey="topics">
          <Tab eventKey="topics" title="Open Topics">
            <ItemList 
              items={items.filter(item => !item.complete)} 
              onCompleteClick={onCompleteClick} 
              onItemTextChange={onItemTextChange} 
              onDeleteClick={onDeleteClick}
              onAddSubItem={onAddSubItem}
              onUpdateSubItem={onUpdateSubItem} 
              onCompleteSubItem={onCompleteSubItem}
              onSubItemDeleteClick={onSubItemDeleteClick} />
            <div className="border-top mt-3">
              <AddItemButton onAddItem={onAddItem}>Add discussion topic</AddItemButton>
            </div>
          </Tab>
          <Tab eventKey="completed" title="Completed Topics">
            <ItemList 
              items={items.filter(item => item.complete).sort((a,b) => b.dateCompleted - a.dateCompleted)}
              hideInactiveSubItems
              onCompleteClick={onCompleteClick} 
              onItemTextChange={onItemTextChange} 
              onDeleteClick={onDeleteClick}
              onAddSubItem={onAddSubItem}
              onUpdateSubItem={onUpdateSubItem} 
              onCompleteSubItem={onCompleteSubItem}
              onSubItemDeleteClick={onSubItemDeleteClick} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
