import React from 'react'
import items from './reducers/items.js'
import { render, fireEvent, screen } from '@testing-library/react'
import AddItemButton from './AddItemButton.jsx'
import Item from './Item.jsx'

it('should call onAddItem if addItem button is clicked', () => {
  const mockOnAddItem = jest.fn()
  render(<AddItemButton onAddItem={mockOnAddItem} />)

  fireEvent.click(screen.getByText('Add discussion topic'), { button: 1 })

  expect(mockOnAddItem).toHaveBeenCalledTimes(1)
})

it('should call onItemTextChange if item text is entered', () => {
  const mockOnItemTextChange = jest.fn()
  const mockOnCompleteClick = jest.fn()
  render(<Item item={{uuid: '1234', complete: false, text: ''}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} />)
  fireEvent.change(screen.getByPlaceholderText('Enter text here'), { target: { value: 'stuff' } })
  expect(mockOnItemTextChange).toHaveBeenCalledWith('1234', 'stuff')
})

it('should call onCompleteClick if item is completed', () => {
  const mockOnItemTextChange = jest.fn()
  const mockOnCompleteClick = jest.fn()
  render(<Item item={{uuid: '1234', complete: false, text: ''}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} />)
  fireEvent.click(screen.getByTestId('complete-button'), { button: 1 })
  expect(mockOnCompleteClick).toHaveBeenCalledWith('1234', true)
})

it('should call onCompleteClick if item is un-completed', () => {
  // const mockOnItemTextChange = jest.fn()
  const mockOnCompleteClick = jest.fn()
  render(<Item item={{uuid: '1234', complete: true, text: ''}} onCompleteClick={mockOnCompleteClick} />)
  fireEvent.click(screen.getByTestId('complete-button'), { button: 1 })
  expect(mockOnCompleteClick).toHaveBeenCalledWith('1234', false)
})

it('should call onDeleteClick if item is deleted', () => {
  // const mockOnItemTextChange = jest.fn()
  const mockOnDeleteClick = jest.fn()
  render(<Item item={{uuid: '1234', complete: true, text: ''}} onDeleteClick={mockOnDeleteClick} />)
  fireEvent.click(screen.getByTestId('delete-button'), { button: 1 })
  expect(mockOnDeleteClick).toHaveBeenCalledWith('1234')
})

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

  it('should handle UPDATE_ITEM', () => {
    expect(items([{
      uuid: '1234',
      complete: false,
      text: '',
      dateCompleted: null,
      subItems: [],
    }], {
      type: 'UPDATE_ITEM',
      payload: {
        uuid: '1234',
        updatedItem: {
          complete: true,
          text: 'help me',
        }
      }
    })).toEqual([
      {
        uuid: '1234',
        complete: true,
        text: 'help me',
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
      complete: false,
      text: '',
      dateCompleted: null,
      subItems: [],
    }], {
      type: 'ADD_SUB_ITEM',
      payload: {
        uuid: '1234',
        subItem: {
          uuid: '5678',
          complete: false,
          text: '',
        }
      }
    })).toEqual([
      {
        uuid: '1234',
        complete: false,
        text: '',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          complete: false,
          text: '',
        }],
      }
    ])
  })

  it('should handle UPDATE_ITEM when completing parent topics', () => {
    expect(items([{
      uuid: '1234',
      complete: false,
      text: '',
      dateCompleted: null,
      subItems: [{
        uuid: '5678',
        complete: false,
        text: 'subtopic 1',
      },{
        uuid: '9876',
        complete: false,
        text: 'subtopic 2',
      }],
    }], {
      type: 'UPDATE_ITEM',
      payload: {
        uuid: '1234',
        updatedItem: {
          complete: true,
          text: 'help me',
        }
      }
    })).toEqual([
      {
        uuid: '1234',
        complete: true,
        text: 'help me',
        dateCompleted: 1572393600000,
        subItems: [{
          uuid: '5678',
          complete: true,
          text: 'subtopic 1',
        },{
          uuid: '9876',
          complete: true,
          text: 'subtopic 2',
        }],
      }
    ])
  })

  it('should handle UPDATE_SUB_ITEM', () => {
    expect(items([{
      uuid: '1234',
      complete: false,
      text: 'topic 1',
      dateCompleted: null,
      subItems: [{
        uuid: '5678',
        complete: false,
        text: '',
      }],
    }], {
      type: 'UPDATE_SUB_ITEM',
      payload: {
        uuid: '1234',
        updatedSubItem: {
          uuid: '5678',
          complete: false,
          text: 'subtopic 1',
        }
      }
    })).toEqual([
      {
        uuid: '1234',
        complete: false,
        text: 'topic 1',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          complete: false,
          text: 'subtopic 1',
        }],
      }
    ])
  })

  it('should handle UPDATE_SUB_ITEM when un-completing sub-topics', () => {
    expect(items([{
      uuid: '1234',
      complete: true,
      text: 'topic 1',
      dateCompleted: 1572393600000,
      subItems: [{
        uuid: '5678',
        complete: true,
        text: 'subtopic 1',
      },{
        uuid: '9876',
        complete: true,
        text: 'subtopic 2',
      }],
    }], {
      type: 'UPDATE_SUB_ITEM',
      payload: {
        uuid: '1234',
        updatedSubItem: {
          uuid: '5678',
          complete: false,
          text: 'subtopic 1',
        }
      }
    })).toEqual([
      {
        uuid: '1234',
        complete: false,
        text: 'topic 1',
        dateCompleted: null,
        subItems: [{
          uuid: '5678',
          complete: false,
          text: 'subtopic 1',
        },{
          uuid: '9876',
          complete: true,
          text: 'subtopic 2',
        }]
      }
    ])
  })

})
