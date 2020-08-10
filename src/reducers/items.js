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
            dateCompleted: action.payload.updatedItem.complete ? Date.now() : null,
            subItems: item.subItems.map(subItem => ({...subItem, complete: action.payload.updatedItem.complete}))
          }
        }

        return item;
      });
      
    case 'DELETE_ITEM':
      return state.filter(item => item.uuid !== action.payload)

    case 'ADD_SUB_ITEM':
      return state.map(item => {
        if (action.payload.uuid === item.uuid) {
          return {
            ...item,
            subItems: [...item.subItems, action.payload.subItem]
          }
        }

        return item
      })

    case 'UPDATE_SUB_ITEM':
      return state.map(item => {
        if (action.payload.uuid === item.uuid) {
          // TODO: is the dateCompleted fucked up due to logic??
          return {
            ...item,
            complete: item.complete && action.payload.updatedSubItem.complete,
            dateCompleted: item.complete && action.payload.updatedSubItem.complete ? Date.now() : null,
            subItems: item.subItems.map(subItem => {
              if (action.payload.updatedSubItem.uuid === subItem.uuid)
                return {...subItem, ...action.payload.updatedSubItem}
              return subItem
            })
          }
        }

        return item
      })

    default:
      return state;
  }
}
