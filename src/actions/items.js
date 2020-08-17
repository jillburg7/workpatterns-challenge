const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export const addItem = () => ({
  type: 'ADD_ITEM',
  payload: {
    uuid: uuid(),
    complete: false,
    text: "",
    active: false,
    dateCompleted: null,
    subItems: [],
  }
})

export const updateItem = (uuid, updatedItem) => ({
  type: 'UPDATE_ITEM',
  payload: {
    uuid,
    updatedItem,
  }
});

export const toggleItem = (uuid, complete) => ({
  type: 'TOGGLE_ITEM',
  payload: {
    uuid,
    complete
  }
})

export const deleteItem = (uuid) => ({
  type: 'DELETE_ITEM',
  payload: uuid
})

export const addSubItem = (parentUuid) => ({
  type: 'ADD_SUB_ITEM',
  payload: {
    parentUuid,
    subItem: {
      uuid: uuid(),
      complete: false,
      text: "",
      active: false,
    }
  }
})

export const updateSubItem = (parentUuid, updatedSubItem) => ({
  type: 'UPDATE_SUB_ITEM',
  payload: {
    parentUuid,
    updatedSubItem
  }
})

export const toggleSubItem = (parentUuid, updatedSubItem) => ({
  type: 'TOGGLE_SUB_ITEM',
  payload: {
    parentUuid,
    updatedSubItem
  }
})

export const deleteSubItem = (parentUuid, subItemUuid) => ({
  type: 'DELETE_SUB_ITEM',
  payload: {
    parentUuid, 
    subItemUuid
  }
})
