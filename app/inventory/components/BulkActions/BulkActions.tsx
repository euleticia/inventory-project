'use client';

import { ProductAction } from '../../state/productTypes';
import styles from './BulkActions.module.css';


interface Props {
  dispatch: React.Dispatch<ProductAction>;
}

export default function BulkActions({ dispatch }: Props) {
  return (
    <div className={styles.actions}>
      <button
        className={styles.button}
        onClick={() =>
          dispatch({ type: 'CHANGE_CATEGORY', payload: 'Promoções' })
        }
      >
        Alterar Categoria
      </button>

      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={() =>
          dispatch({ type: 'APPLY_DISCOUNT', payload: 10 })
        }
      >
        Aplicar 10% Desconto
      </button>
    </div>
  );
}
