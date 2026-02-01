'use client';

import { useState } from 'react';
import { ProductAction } from '../../state/productTypes';
import styles from './BulkActions.module.css';

interface Props {
  dispatch: React.Dispatch<ProductAction>;
}

const CATEGORIES = [
  'Eletrônicos',
  'Acessórios',
  'Componentes',
  'Armazenamento',
  'Promoções'
];

export default function BulkActions({ dispatch }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleChangeCategory = (category: string) => {
    dispatch({ type: 'CHANGE_CATEGORY', payload: category });
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => setShowModal(true)}
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

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Selecione a categoria</h2>
            <div className={styles.categoryList}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={styles.categoryOption}
                  onClick={() => handleChangeCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
