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
  }
})

export const updateItem = (uuid, updatedItem) => ({
  type: 'UPDATE_ITEM',
  payload: {
    uuid,
    updatedItem,
  }
});
