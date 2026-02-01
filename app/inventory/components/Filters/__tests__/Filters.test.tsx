import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../Filters';

describe('Filters', () => {
  const mockSearchChange = jest.fn();
  const mockCategoryChange = jest.fn();

  beforeEach(() => {
    mockSearchChange.mockClear();
    mockCategoryChange.mockClear();
  });

  it('renders search input and category select', () => {
    render(
      <Filters
        search=""
        onSearchChange={mockSearchChange}
        onCategoryChange={mockCategoryChange}
      />
    );
    
    expect(screen.getByPlaceholderText('Buscar por nome')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Todas categorias')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    render(
      <Filters
        search=""
        onSearchChange={mockSearchChange}
        onCategoryChange={mockCategoryChange}
      />
    );
    
    const input = screen.getByPlaceholderText('Buscar por nome');
    fireEvent.change(input, { target: { value: 'Mouse' } });
    
    expect(mockSearchChange).toHaveBeenCalledWith('Mouse');
  });

  it('calls onCategoryChange when category select changes', () => {
    render(
      <Filters
        search=""
        onSearchChange={mockSearchChange}
        onCategoryChange={mockCategoryChange}
      />
    );
    
    const select = screen.getByDisplayValue('Todas categorias');
    fireEvent.change(select, { target: { value: 'Eletrônicos' } });
    
    expect(mockCategoryChange).toHaveBeenCalledWith('Eletrônicos');
  });

  it('displays all available categories', () => {
    render(
      <Filters
        search=""
        onSearchChange={mockSearchChange}
        onCategoryChange={mockCategoryChange}
      />
    );
    
    expect(screen.getByText('Todas categorias')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('Acessórios')).toBeInTheDocument();
    expect(screen.getByText('Componentes')).toBeInTheDocument();
  });

  it('displays search value when provided', () => {
    render(
      <Filters
        search="test"
        onSearchChange={mockSearchChange}
        onCategoryChange={mockCategoryChange}
      />
    );
    
    const input = screen.getByPlaceholderText('Buscar por nome') as HTMLInputElement;
    expect(input.value).toBe('test');
  });
});
