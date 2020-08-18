import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AddItemButton from './AddItemButton.jsx'

it('should call onAddItem if addItem button is clicked', () => {
  const mockOnAddItem = jest.fn()
  render(<AddItemButton onAddItem={mockOnAddItem} />)

  fireEvent.click(screen.getByTestId('add-button'), { button: 1 })

  expect(mockOnAddItem).toHaveBeenCalledTimes(1)
})

