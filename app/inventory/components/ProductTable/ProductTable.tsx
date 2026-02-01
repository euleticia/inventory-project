"use client";

import { useRef, useEffect } from "react";
import { Product } from "../../types";
import { ProductAction } from "../../state/productTypes";
import ProductRow from "../ProductRow/ProductRow";
import styles from "./ProductTable.module.css";

interface Props {
  products: Product[];
  dispatch: React.Dispatch<ProductAction>;
}

export default function ProductTable({ products, dispatch }: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const allSelected = products.length > 0 && products.every(p => p.selected);
  const someSelected = products.some(p => p.selected);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SELECT_ALL', payload: e.target.checked });
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.headerCell} ${styles.checkboxCol}`}>
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            />
          </th>
          <th className={styles.headerCell}>Nome</th>
          <th className={styles.headerCell}>Categoria</th>
          <th className={styles.headerCell}>Preço</th>
          <th className={styles.headerCell}>Estoque</th>
          <th className={styles.headerCell}>Status</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={6} className={styles.empty}>
              Nenhum item encontrado
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <ProductRow key={product.id} product={product} dispatch={dispatch} />
          ))
        )}
      </tbody>
    </table>
  );
}
