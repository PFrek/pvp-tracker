'use client';
import { IFilter } from '@/app/lib/definitions';
import styles from './FilterBar.module.css';


const FilterBar = ({ handleFilterChange }: { handleFilterChange: (filter: string) => void }) => {

  return (
    <div className={styles.filters}>
      <button onClick={() => { handleFilterChange('today')}}>Today</button>
      <button onClick={() => { handleFilterChange('week')}}>This Week</button>
      <button onClick={() => { handleFilterChange('all_time')}}>All Time</button>
      <p>Order by</p>
      {/* <button onClick={() => { sortByDate('desc') }}>Recent</button>
      <button onClick={() => { sortByDate('asc') }}>Oldest</button> */}
    </div>
  )
}

export default FilterBar