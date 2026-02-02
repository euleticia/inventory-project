'use client';
import styles from './Filters.module.css';
import { CATEGORIES } from '../../constants/categories';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
}

export default function Filters({
  search,
  onSearchChange,
  onCategoryChange
}: Props) {
  return (
    <div className={styles.filters}>
      <input
        className={styles.input}
        placeholder="Buscar por nome"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />

      <select className={styles.select} onChange={e => onCategoryChange(e.target.value)}>
        <option value="">Todas categorias</option>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
