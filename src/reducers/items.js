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
            active: Boolean(action.payload.updatedItem.text),
          }
        }

        return item;
      });

    case 'TOGGLE_ITEM':
      return state.map((item) => {
        if (action.payload.uuid === item.uuid) {
          return {
            ...item,
            complete: action.payload.complete,
            dateCompleted: action.payload.complete ? Date.now() : null,
            subItems: item.subItems.map(subItem => ({...subItem, complete: action.payload.complete})).filter(sub => sub.active)
          }
        }

        return item;
      });
      
    case 'DELETE_ITEM':
      return state.filter(item => item.uuid !== action.payload)

    case 'ADD_SUB_ITEM':
      return state.map(item => {
        if (action.payload.parentUuid === item.uuid) {
          return {
            ...item,
            uuid: action.payload.parentUuid,
            subItems: [...item.subItems, action.payload.subItem]
          }
        }

        return item
      })

    case 'UPDATE_SUB_ITEM':
      return state.map(item => {
        if (action.payload.parentUuid === item.uuid) {
          return {
            ...item,
            subItems: item.subItems.map(subItem => {
              if (action.payload.updatedSubItem.uuid === subItem.uuid)
                return {
                  ...subItem, 
                  ...action.payload.updatedSubItem,
                  active: Boolean(action.payload.updatedSubItem.text)
                }
              return subItem
            })
          }
        }

        return item
      })

    case 'TOGGLE_SUB_ITEM':
      return state.map(item => {
        if (action.payload.parentUuid === item.uuid) {
          let isItemComplete = action.payload.updatedSubItem.complete && (item.subItems.filter(subItem => !subItem.complete).length === 1)
          return {
            ...item,
            complete: isItemComplete,
            dateCompleted: isItemComplete ? Date.now() : null,
            subItems: item.subItems.map(subItem => {
              if (action.payload.updatedSubItem.uuid === subItem.uuid)
                return {...subItem, ...action.payload.updatedSubItem}
              return subItem
            })
          }
        }

        return item
      })
      
    case 'DELETE_SUB_ITEM':
      return state.map(item => {
        if (action.payload.parentUuid === item.uuid) {
          return {
            ...item,
            subItems: item.subItems.filter(subItem => subItem.uuid !== action.payload.subItemUuid)
          }
        }

        return item
      })

    default:
      return state;
  }
}
