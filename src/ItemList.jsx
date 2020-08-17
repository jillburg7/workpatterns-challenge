import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from './Item.jsx';
import AddItemButton from './AddItemButton.jsx'

const itemListPropTypes = {
  items: PropTypes.array.isRequired,
  onCompleteClick: PropTypes.func.isRequired,
  onItemTextChange: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddSubItem: PropTypes.func.isRequired,
  onUpdateSubItem: PropTypes.func.isRequired,
  onCompleteSubItem: PropTypes.func.isRequired,
  onSubItemDeleteClick: PropTypes.func.isRequired,
  hideInactiveSubItems: PropTypes.bool,
};

const ItemList = ({ 
  items,
  onCompleteClick,
  onItemTextChange,
  onDeleteClick,
  onAddSubItem,
  onUpdateSubItem,
  onCompleteSubItem,
  onSubItemDeleteClick,
  hideInactiveSubItems = false, 
}) => (
  <>
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
  </>
);

ItemList.propTypes = itemListPropTypes;

export default ItemList;
