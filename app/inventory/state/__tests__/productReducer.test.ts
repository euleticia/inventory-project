import { productReducer, initialState } from '../productReducer';
import { Product } from '../../types';

describe('productReducer', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Notebook',
    category: 'Eletrônicos',
    price: 4500,
    stock: 10,
    status: 'active',
    selected: false
  };

  it('returns initial state', () => {
    const state = productReducer(initialState, { type: 'INVALID' } as any);
    expect(state).toEqual(initialState);
  });

  it('handles SET_LOADING action', () => {
    const state = productReducer(initialState, {
      type: 'SET_LOADING',
      payload: true
    });
    
    expect(state.loading).toBe(true);
  });

  it('handles SET_PRODUCTS action', () => {
    const products = [mockProduct];
    const state = productReducer(initialState, {
      type: 'SET_PRODUCTS',
      payload: products
    });
    
    expect(state.products).toEqual(products);
    expect(state.loading).toBe(false);
  });

  it('handles TOGGLE_SELECT action', () => {
    const stateWithProducts = {
      ...initialState,
      products: [mockProduct]
    };

    const state = productReducer(stateWithProducts, {
      type: 'TOGGLE_SELECT',
      payload: 1
    });
    
    expect(state.products[0].selected).toBe(true);
  });

  it('toggles select multiple times', () => {
    const stateWithProducts = {
      ...initialState,
      products: [mockProduct]
    };

    let state = productReducer(stateWithProducts, {
      type: 'TOGGLE_SELECT',
      payload: 1
    });
    expect(state.products[0].selected).toBe(true);

    state = productReducer(state, {
      type: 'TOGGLE_SELECT',
      payload: 1
    });
    expect(state.products[0].selected).toBe(false);
  });

  it('handles SELECT_ALL action with true', () => {
    const stateWithProducts = {
      ...initialState,
      products: [mockProduct, { ...mockProduct, id: 2 }]
    };

    const state = productReducer(stateWithProducts, {
      type: 'SELECT_ALL',
      payload: true
    });
    
    expect(state.products[0].selected).toBe(true);
    expect(state.products[1].selected).toBe(true);
  });

  it('handles SELECT_ALL action with false', () => {
    const stateWithProducts = {
      ...initialState,
      products: [
        { ...mockProduct, selected: true },
        { ...mockProduct, id: 2, selected: true }
      ]
    };

    const state = productReducer(stateWithProducts, {
      type: 'SELECT_ALL',
      payload: false
    });
    
    expect(state.products[0].selected).toBe(false);
    expect(state.products[1].selected).toBe(false);
  });

  it('handles CHANGE_CATEGORY action', () => {
    const stateWithProducts = {
      ...initialState,
      products: [
        { ...mockProduct, selected: true },
        { ...mockProduct, id: 2, selected: false }
      ]
    };

    const state = productReducer(stateWithProducts, {
      type: 'CHANGE_CATEGORY',
      payload: 'Promoções'
    });
    
    expect(state.products[0].category).toBe('Promoções');
    expect(state.products[1].category).toBe('Eletrônicos');
  });

  it('handles APPLY_DISCOUNT action', () => {
    const stateWithProducts = {
      ...initialState,
      products: [
        { ...mockProduct, selected: true, price: 100 },
        { ...mockProduct, id: 2, selected: false, price: 200 }
      ]
    };

    const state = productReducer(stateWithProducts, {
      type: 'APPLY_DISCOUNT',
      payload: 10
    });
    
    expect(state.products[0].price).toBe(90);
    expect(state.products[1].price).toBe(200);
  });

  it('applies correct discount percentage', () => {
    const stateWithProducts = {
      ...initialState,
      products: [{ ...mockProduct, selected: true, price: 100 }]
    };

    const state = productReducer(stateWithProducts, {
      type: 'APPLY_DISCOUNT',
      payload: 25
    });
    
    expect(state.products[0].price).toBe(75);
  });
});
