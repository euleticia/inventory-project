import { Product, ProductStatus } from '../types';

export type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'TOGGLE_SELECT'; payload: number }
  | { type: 'SELECT_ALL'; payload: boolean }
  | { type: 'CHANGE_CATEGORY'; payload: string }
  | { type: 'APPLY_DISCOUNT'; payload: number }
  | { type: 'CHANGE_STATUS'; payload: ProductStatus }
  | { type: 'SET_LOADING'; payload: boolean };
