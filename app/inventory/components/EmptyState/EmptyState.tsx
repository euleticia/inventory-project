'use client';

import styles from './EmptyState.module.css';

interface Props {
  message?: string;
}

export default function EmptyState({ message = 'Nenhum produto encontrado' }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>📭</div>
      <h3 className={styles.title}>Nenhum resultado</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
