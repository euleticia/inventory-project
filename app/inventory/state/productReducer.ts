import { Product } from '../types';
import { ProductAction } from './productTypes';

export interface ProductState {
  products: Product[];
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  loading: false
};

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'TOGGLE_SELECT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload
            ? { ...p, selected: !p.selected }
            : p
        )
      };

    case 'SELECT_ALL':
      return {
        ...state,
        products: state.products.map(p => ({
          ...p,
          selected: action.payload
        }))
      };

    case 'CHANGE_CATEGORY':
      return {
        ...state,
        products: state.products.map(p =>
          p.selected ? { ...p, category: action.payload } : p
        )
      };

    case 'APPLY_DISCOUNT':
      return {
        ...state,
        products: state.products.map(p =>
          p.selected
            ? { ...p, price: p.price * (1 - action.payload / 100) }
            : p
        )
      };

    default:
      return state;
  }
}
