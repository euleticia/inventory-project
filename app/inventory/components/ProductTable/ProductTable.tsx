"use client";

import { Product } from "../../types";
import { ProductAction } from "../../state/productTypes";
import ProductRow from "../ProductRow/ProductRow";
import styles from "./ProductTable.module.css";

interface Props {
  products: Product[];
  dispatch: React.Dispatch<ProductAction>;
}

export default function ProductTable({ products, dispatch }: Props) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={`${styles.headerCell} ${styles.checkboxCol}`}>
            <input type="checkbox" />
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
