import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductTable from '../ProductTable';
import { Product } from '../../../types';

describe('ProductTable', () => {
  const mockDispatch = jest.fn();

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Notebook',
      category: 'Eletrônicos',
      price: 4500,
      stock: 10,
      status: 'active',
      selected: false
    },
    {
      id: 2,
      name: 'Mouse',
      category: 'Acessórios',
      price: 150,
      stock: 50,
      status: 'active',
      selected: false
    }
  ];

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders table with headers', () => {
    render(<ProductTable products={mockProducts} dispatch={mockDispatch} />);
    
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
    expect(screen.getByText('Estoque')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders products in table rows', () => {
    render(<ProductTable products={mockProducts} dispatch={mockDispatch} />);
    
    expect(screen.getByText('Notebook')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('Acessórios')).toBeInTheDocument();
  });

  it('displays empty message when no products', () => {
    render(<ProductTable products={[]} dispatch={mockDispatch} />);
    
    expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
  });

  it('renders checkbox in header', () => {
    render(<ProductTable products={mockProducts} dispatch={mockDispatch} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('dispatches SELECT_ALL when header checkbox is clicked', () => {
    render(<ProductTable products={mockProducts} dispatch={mockDispatch} />);
    
    const headerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(headerCheckbox);
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SELECT_ALL',
      payload: true
    });
  });

  it('sets header checkbox as indeterminate when some products are selected', () => {
    const productsWithSelection = [
      { ...mockProducts[0], selected: true },
      { ...mockProducts[1], selected: false }
    ];

    const { container } = render(
      <ProductTable products={productsWithSelection} dispatch={mockDispatch} />
    );
    
    const headerCheckbox = container.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    expect(headerCheckbox.indeterminate).toBe(true);
  });

  it('sets header checkbox as checked when all products are selected', () => {
    const productsAllSelected = [
      { ...mockProducts[0], selected: true },
      { ...mockProducts[1], selected: true }
    ];

    const { container } = render(
      <ProductTable products={productsAllSelected} dispatch={mockDispatch} />
    );
    
    const headerCheckbox = container.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    expect(headerCheckbox.checked).toBe(true);
  });
});
