import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Item from './Item.jsx'

it('should call onItemTextChange if item text is entered', () => {
    const mockOnItemTextChange = jest.fn()
    const mockOnCompleteClick = jest.fn()
    const mockOnDeleteClick = jest.fn()
    render(<Item item={{uuid: '1234', complete: false, text: '', active: false}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} onDeleteClick={mockOnDeleteClick} />)
    fireEvent.change(screen.getByPlaceholderText('Enter text here'), { target: { value: 'stuff' } })
    expect(mockOnItemTextChange).toHaveBeenCalledWith('1234', 'stuff')
  })
  
  it('should call onCompleteClick if item is completed', () => {
    const mockOnItemTextChange = jest.fn()
    const mockOnCompleteClick = jest.fn()
    const mockOnDeleteClick = jest.fn()
    render(<Item item={{uuid: '1234', complete: false, text: '', active: true}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} onDeleteClick={mockOnDeleteClick} />)
    fireEvent.click(screen.getByTestId('complete-button'), { button: 1 })
    expect(mockOnCompleteClick).toHaveBeenCalledWith('1234', true)
  })
  
  it('should call onCompleteClick if item is un-completed', () => {
    const mockOnItemTextChange = jest.fn()
    const mockOnCompleteClick = jest.fn()
    const mockOnDeleteClick = jest.fn()
    render(<Item item={{uuid: '1234', complete: true, text: '', active: true}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} onDeleteClick={mockOnDeleteClick} />)
    fireEvent.click(screen.getByTestId('complete-button'), { button: 1 })
    expect(mockOnCompleteClick).toHaveBeenCalledWith('1234', false)
  })
  
  it('should call onDeleteClick if item is deleted', () => {
    const mockOnItemTextChange = jest.fn()
    const mockOnCompleteClick = jest.fn()
    const mockOnDeleteClick = jest.fn()
    render(<Item item={{uuid: '1234', complete: true, text: '', active: false}} onCompleteClick={mockOnCompleteClick} onItemTextChange={mockOnItemTextChange} onDeleteClick={mockOnDeleteClick} />)
    fireEvent.click(screen.getByTestId('delete-button'), { button: 1 })
    expect(mockOnDeleteClick).toHaveBeenCalledWith('1234')
  })