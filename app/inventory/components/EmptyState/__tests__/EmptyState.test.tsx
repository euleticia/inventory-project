import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from '../EmptyState';

describe('EmptyState', () => {
  it('renders empty state with default message', () => {
    render(<EmptyState />);
    
    expect(screen.getByText('Nenhum resultado')).toBeInTheDocument();
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument();
  });

  it('renders empty state with custom message', () => {
    const customMessage = 'Nenhum produto corresponde aos filtros';
    render(<EmptyState message={customMessage} />);
    
    expect(screen.getByText('Nenhum resultado')).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('displays mailbox icon', () => {
    const { container } = render(<EmptyState />);
    
    const icon = container.querySelector('.icon');
    expect(icon?.textContent).toBe('📭');
  });

  it('has correct structure', () => {
    const { container } = render(<EmptyState />);
    
    const container_div = container.querySelector('.container');
    expect(container_div).toBeInTheDocument();
    expect(container_div?.children.length).toBe(3); // icon + title + message
  });
});
