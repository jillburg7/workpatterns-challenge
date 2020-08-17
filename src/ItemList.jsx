import React from 'react';
import Item from './Item.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddItemButton from './AddItemButton.jsx'


const ItemList = ({ items, hideInactiveSubItems = false, onCompleteClick, onItemTextChange, onDeleteClick, onAddSubItem, onUpdateSubItem, onCompleteSubItem, onSubItemDeleteClick }) => {
  return (<>
    {items.length === 0 && (
      <Row className="p-4 text-center">
        <Col className="text-muted">
          You don't have any {hideInactiveSubItems ? " completed " : ""} discussion topics yet
        </Col>
      </Row>
    )}
    {items.map(item => (
        <div key={`topic-item-${item.uuid}`}>
          <Item
            key={item.uuid}
            item={item}
            onCompleteClick={onCompleteClick}
            onItemTextChange={onItemTextChange}
            onDeleteClick={onDeleteClick} />

          {item.active && item.subItems.map(subItem => {
            if (hideInactiveSubItems && !subItem.active)
              return <></>

            return (
              <Row className="mt-1 bg-white" key={`sub-item-row-${subItem.uuid}`}>
                <Col md="auto"></Col>
                <Col>
                  <Item 
                    key={subItem.uuid} 
                    item={subItem} 
                    onCompleteClick={(childUuid, change) => onCompleteSubItem(item.uuid, { uuid: childUuid, complete: change })} 
                    onItemTextChange={(childUuid, change) => onUpdateSubItem(item.uuid, { uuid: childUuid, text: change })} 
                    onDeleteClick={(childUuid) => onSubItemDeleteClick(item.uuid, childUuid)} />
                </Col>
              </Row>
            )
          })}

          {!hideInactiveSubItems && item.text &&
            <Row>
              <Col md="auto"></Col>
              <Col>
                <AddItemButton variant="outline-primary" onAddItem={() => onAddSubItem(item.uuid)}>Add sub-topic</AddItemButton>
              </Col>
            </Row>
          }
        </div>
      )
    )}
  </>);
};

export default ItemList;
