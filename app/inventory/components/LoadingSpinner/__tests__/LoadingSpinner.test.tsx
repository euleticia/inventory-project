import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument();
  });

  it('displays spinner animation element', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinner = container.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('has correct structure with container and text', () => {
    const { container } = render(<LoadingSpinner />);
    
    const container_div = container.querySelector('.container');
    expect(container_div).toBeInTheDocument();
    expect(container_div?.children.length).toBe(2);
  });
});
