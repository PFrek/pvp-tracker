import { IFilter } from '@/app/lib/definitions';
import styles from './FilterBar.module.css';
import { SetStateAction } from 'react';

const getLocaleDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() <= 9 ? '0' : '' + date.getMonth();
  const day = date.getDate() <= 9 ? '0' : '' + date.getDate();

  return `${year}-${month}-${day}`;
}

// Maybe shift week start to Tue?
const getWeekBoundaries = (today: Date) => {
  const MS_IN_A_DAY = 24 * 60 * 60000;
  const weekDay = today.getDay();
  const firstDay = new Date(today.getTime() - (weekDay * MS_IN_A_DAY));
  const lastDay = new Date(today.getTime() + ((6 - weekDay) * MS_IN_A_DAY));

  return { firstDay: getLocaleDate(firstDay), lastDay: getLocaleDate(lastDay) };
}

const FilterBar = ({ filter, setFilter }: { filter: IFilter, setFilter: React.Dispatch<SetStateAction<IFilter>> }) => {

  const filterMatches = (key: string, value?: string) => {
    if (key === 'date') {
      switch (value) {

        case 'today':
          const today = new Date();
          const newFilter = { ...filter, date: getLocaleDate(today) };
          setFilter(newFilter);
          break;

        case 'week':
          const { firstDay, lastDay } = getWeekBoundaries(new Date());
          setFilter({ ...filter, startDate: firstDay, endDate: lastDay });
          break;

        case 'all_time':
        default:
          setFilter({ ...filter, date: undefined, startDate: undefined, endDate: undefined })
          return;
      }
    }
    else if (key === 'job') {

    }
  };

  return (
    <div className={styles.filters}>
      <button onClick={() => { filterMatches('date', 'today') }}>Today</button>
      <button onClick={() => { filterMatches('date', 'week') }}>This Week</button>
      <button onClick={() => { filterMatches('date', 'all_time') }}>All Time</button>
      <p>Order by</p>
      {/* <button onClick={() => { sortByDate('desc') }}>Recent</button>
      <button onClick={() => { sortByDate('asc') }}>Oldest</button> */}
    </div>
  )
}

export default FilterBar