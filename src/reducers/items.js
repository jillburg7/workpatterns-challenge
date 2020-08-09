export default function items(state = [], action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.payload
      ];
    case 'UPDATE_ITEM':
      return state.map((item) => {
        if (action.payload.uuid === item.uuid) {
          return {
            ...item,
            ...action.payload.updatedItem,
          }
        }

        return item;
      });
    default:
      return state;
  }
}
