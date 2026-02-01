"use client";

import { Product } from "../../types";
import { ProductAction } from "../../state/productTypes";
import styles from "./ProductRow.module.css";

interface Props {
  product: Product;
  dispatch: React.Dispatch<ProductAction>;
}

export default function ProductRow({ product, dispatch }: Props) {
  return (
    <tr>
      <td className={`${styles.cell} ${styles.checkboxCol}`}>
        <input
          type="checkbox"
          checked={product.selected}
          onChange={() =>
            dispatch({ type: "TOGGLE_SELECT", payload: product.id })
          }
        />
      </td>

      <td className={styles.cell}>{product.name}</td>
      <td className={styles.cell}>{product.category}</td>
      <td className={styles.cell}>R$ {product.price.toFixed(2)}</td>
      <td className={styles.cell}>{product.stock}</td>
      <td className={styles.cell}>{product.status}</td>
    </tr>
  );
}
