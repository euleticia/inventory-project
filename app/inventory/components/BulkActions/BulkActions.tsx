'use client';

import { useState } from 'react';
import { ProductAction } from '../../state/productTypes';
import styles from './BulkActions.module.css';

interface Props {
  dispatch: React.Dispatch<ProductAction>;
  hasSelectedProducts: boolean;
}

const CATEGORIES = [
  'Eletrônicos',
  'Acessórios',
  'Componentes',
  'Armazenamento',
  'Promoções'
];

export default function BulkActions({ dispatch, hasSelectedProducts }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [discountValue, setDiscountValue] = useState('10');

  const handleChangeCategory = (category: string) => {
    dispatch({ type: 'CHANGE_CATEGORY', payload: category });
    setShowModal(false);
  };

  const handleApplyDiscount = () => {
    const discount = parseFloat(discountValue);
    if (discount > 0 && discount <= 100) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: discount });
      setShowDiscountModal(false);
      setDiscountValue('10');
    }
  };

  const handleChangeStatus = (status: 'active' | 'inactive') => {
    dispatch({ type: 'CHANGE_STATUS', payload: status });
    setShowStatusModal(false);
  };

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() => setShowModal(true)}
          disabled={!hasSelectedProducts}
        >
          Alterar Categoria
        </button>

        <button
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => setShowDiscountModal(true)}
          disabled={!hasSelectedProducts}
        >
          Aplicar Desconto
        </button>

        <button
          className={`${styles.button} ${styles.tertiary}`}
          onClick={() => setShowStatusModal(true)}
          disabled={!hasSelectedProducts}
        >
          Alterar Status
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

      {showDiscountModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDiscountModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Aplicar Desconto</h2>
            <div className={styles.discountInput}>
              <input
                type="number"
                min="0"
                max="100"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Digite a porcentagem"
              />
              <span>%</span>
            </div>
            <div className={styles.discountButtons}>
              <button
                className={`${styles.button} ${styles.secondary}`}
                onClick={handleApplyDiscount}
              >
                Aplicar
              </button>
              <button
                className={`${styles.button} ${styles.cancel}`}
                onClick={() => setShowDiscountModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className={styles.modalOverlay} onClick={() => setShowStatusModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Alterar Status</h2>
            <div className={styles.statusList}>
              <button
                className={styles.statusOption}
                onClick={() => handleChangeStatus('active')}
              >
                ✓ Ativar
              </button>
              <button
                className={styles.statusOption}
                onClick={() => handleChangeStatus('inactive')}
              >
                ✗ Desativar
              </button>
            </div>
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={() => setShowStatusModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
