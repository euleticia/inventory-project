'use client';
import styles from './Filters.module.css';

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
        <option value="Eletrônicos">Eletrônicos</option>
        <option value="Acessórios">Acessórios</option>
      </select>
    </div>
  );
}
