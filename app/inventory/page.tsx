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
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

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

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        products={paginatedProducts}
        dispatch={dispatch}
      />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Próxima
          </button>
        </div>
      )}
      </div>
    </>
  );
}
