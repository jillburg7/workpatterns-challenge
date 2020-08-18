import items from './items.js'

describe('items reducer', () => {
    beforeEach(() => {
      Date.now = jest.fn(() => 1572393600000); // 2019-10-30T00:00Z0 (GMT)
    });
    
    it('should return the initial state', () => {
      expect(items(undefined, {})).toEqual([])
    })
  
    it('should handle ADD_ITEM', () => {
      expect(items([{}], {
        type: 'ADD_ITEM',
        payload: {
          uuid: '1234',
          complete: false,
          text: '',
          dateCompleted: null,
          subItems: [],
        }
      })).toEqual([
        {},
        {
          uuid: '1234',
          complete: false,
          text: '',
          dateCompleted: null,
          subItems: [],
        }
      ])
    })
  
    it('should handle UPDATE_ITEM when item text changes', () => {
      expect(items([{
        uuid: '1234',
        active: false,
        complete: false,
        text: '',
        dateCompleted: null,
        subItems: [],
      }], {
        type: 'UPDATE_ITEM',
        payload: {
          uuid: '1234',
          updatedItem: {
            text: 'help me',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: false,
          text: 'help me',
          dateCompleted: null,
          subItems: [],
        }
      ])
    })
  
    it('should handle TOGGLE_ITEM when item is marked as complete', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic!',
        dateCompleted: null,
        subItems: [],
      }], {
        type: 'TOGGLE_ITEM',
        payload: {
            uuid: '1234',
            complete: true,
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: true,
          text: 'topic!',
          dateCompleted: 1572393600000,
          subItems: [],
        }
      ])
    })
  
  
    it('should handle DELETE_ITEM', () => {
      expect(items([
        {},
        {
          uuid: '1234',
          active: false,
          complete: false,
          text: '',
          dateCompleted: null,
          subItems: [],
        }
      ], {
        type: 'DELETE_ITEM',
        payload: '1234',
      })).toEqual([
        {}
      ])
    })
  
    it('should handle ADD_SUB_ITEM', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic!',
        dateCompleted: null,
        subItems: [],
      }], {
        type: 'ADD_SUB_ITEM',
        payload: {
          parentUuid: '1234',
          subItem: {
            uuid: '5678',
            complete: false,
            text: '',
            active: false,
            }
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: false,
          text: 'topic!',
          dateCompleted: null,
          subItems: [{
            uuid: '5678',
            complete: false,
            text: '',
            active: false,
          }],
        }
      ])
    })
  
    it('should handle TOGGLE_ITEM when completing parent topics', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic!',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          active: true,
          complete: false,
          text: 'subtopic 1',
        },{
          uuid: '9876',
          active: true,
          complete: false,
          text: 'subtopic 2',
        }],
      }], {
        type: 'TOGGLE_ITEM',
        payload: {
            uuid: '1234',
            complete: true,
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: true,
          text: 'topic!',
          dateCompleted: 1572393600000,
          subItems: [{
            uuid: '5678',
            active: true,
            complete: true,
            text: 'subtopic 1',
          },{
            uuid: '9876',
            active: true,
            complete: true,
            text: 'subtopic 2',
          }],
        }
      ])
    })
  
    it('should handle UPDATE_SUB_ITEM when sub-topic text changes', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic 1',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          active: false,
          complete: false,
          text: '',
        }],
      }], {
        type: 'UPDATE_SUB_ITEM',
        payload: {
          parentUuid: '1234',
          updatedSubItem: {
            uuid: '5678',
            active: false,
            complete: false,
            text: 'subtopic 1',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: false,
          text: 'topic 1',
          dateCompleted: null,
          subItems: [{
            uuid: '5678',
            active: true,
            complete: false,
            text: 'subtopic 1',
          }],
        }
      ])
    })
  
    it('should handle TOGGLE_SUB_ITEM when un-completing sub-topics', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: true,
        text: 'topic 1',
        dateCompleted: 1572393600000,
        subItems: [{
          uuid: '5678',
          active: true,
          complete: true,
          text: 'subtopic 1',
        },{
          uuid: '9876',
          active: true,
          complete: true,
          text: 'subtopic 2',
        }],
      }], {
        type: 'TOGGLE_SUB_ITEM',
        payload: {
          parentUuid: '1234',
          updatedSubItem: {
            uuid: '5678',
            active: true,
            complete: false,
            text: 'subtopic 1',
          }
        }
      })).toEqual([
        {
          uuid: '1234',
          active: true,
          complete: false,
          text: 'topic 1',
          dateCompleted: null,
          subItems: [{
            uuid: '5678',
            active: true,
            complete: false,
            text: 'subtopic 1',
          },{
            uuid: '9876',
            active: true,
            complete: true,
            text: 'subtopic 2',
          }]
        }
      ])
    })

    it('should handle DELETE_SUB_ITEM', () => {
      expect(items([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic 1',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          active: true,
          complete: false,
          text: 'subtopic 1',
        },{
          uuid: '9876',
          active: true,
          complete: false,
          text: 'subtopic 2',
        }],
      }], {
        type: 'DELETE_SUB_ITEM',
        payload: {
            parentUuid: '1234',
            subItemUuid: '5678',
          }
      })).toEqual([{
        uuid: '1234',
        active: true,
        complete: false,
        text: 'topic 1',
        dateCompleted: null,
        subItems: [{
          uuid: '9876',
          active: true,
          complete: false,
          text: 'subtopic 2',
        }],
      }])
    })
  
  })