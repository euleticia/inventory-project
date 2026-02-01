'use client';

import { useEffect, useReducer, useState } from 'react';
import { productReducer, initialState } from './state/productReducer';
import ProductTable from './components/ProductTable/ProductTable';
import { Product } from './types';
import Filters from './components/Filters/Filters';
import BulkActions from './components/BulkActions/BulkActions';
import styles from './page.module.css';


export default function InventoryPage() {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });

    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        dispatch({ type: 'SET_PRODUCTS', payload: data });
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const filteredProducts = state.products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  const hasSelectedProducts = state.products.some(p => p.selected);

  if (state.loading) return <p>Carregando...</p>;

  return (
    <>
    <div className={styles.container}>
    <h1 className={styles.title}>Inventário</h1>

      <Filters
        search={search}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <BulkActions dispatch={dispatch} hasSelectedProducts={hasSelectedProducts} />

      <ProductTable
        products={filteredProducts}
        dispatch={dispatch}
      />
      </div>
    </>
  );
}
