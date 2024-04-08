'use client';
import { IFilter, jobs, matchTypes } from '@/app/lib/definitions';
import styles from './FilterBar.module.css';
import { ChangeEvent, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (filters: IFilter) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      })

      return params.toString();
    },
    [searchParams]
  );

  const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();

    const str = `${year}-${month}-${day}`;
    console.log(str);

    return str;
  }

  const stringToFilter = (str: string): IFilter => {
    const today = new Date();
    if (today.getUTCHours() < 8) {
      today.setUTCDate(today.getUTCDate() - 1);
    }
    today.setUTCHours(8, 0, 0);
    const MS_IN_A_DAY = 24 * 60 * 60000;
    if (str === 'today') {
      return { date: getDateString(today), startDate: undefined, endDate: undefined };
    }
    else if (str === 'week') {
      const tuesOffset = (today.getDay() + 5) % 7; // Gets the offset in days from the previous tuesday
      const weekStart = new Date(today.getTime() - (tuesOffset * MS_IN_A_DAY));
      console.log(`weekStart: ${weekStart}`);

      console.log(`weekStart: ${weekStart}`);
      const weekEnd = new Date(weekStart.getTime() + 6 * MS_IN_A_DAY);

      return { date: undefined, startDate: getDateString(weekStart), endDate: getDateString(weekEnd) };
    }
    else {
      return { date: undefined, startDate: undefined, endDate: undefined };
    }
  }

  const changeFilter = (type: string, value: string): void => {
    let newFilter: IFilter = {};
    if (type === 'date') {
      const dates = stringToFilter(value);
      newFilter = { ...newFilter, ...dates };
    }
    else if (type === 'order') {
      newFilter.order = value;
    }
    else if (type === 'jobs') {
      if (!jobs.includes(value)) {
        newFilter.job = undefined;
      }
      else {
        newFilter.job = value;
      }
    }
    else if(type === 'types') {
      if(!matchTypes.includes(value)) {
        newFilter.type = undefined;
      }
      else {
        newFilter.type = value;
      }
    }

    if (Object.entries(newFilter).length) {
      const queryStr = createQueryString(newFilter);
      router.push(pathname + '?' + queryStr);
    }
  }

  const handleSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const type = ev.currentTarget.name;
    const value = ev.currentTarget.value;
    changeFilter(type, value);
  }

  return (
    <div className={styles.filters}>
      <button onClick={() => { changeFilter('date', 'today') }}>Today</button>
      <button onClick={() => { changeFilter('date', 'week') }}>This Week</button>
      <button onClick={() => { changeFilter('date', 'all_time') }}>All Time</button>
      <label htmlFor="jobs">Job:</label>
      <select name="jobs" onChange={handleSelectChange}>
        <option value="ANY">ANY</option>;
        {jobs.map((job) => {
          return (
            <option key={job} value={job}>{job}</option>
          );
        })}
      </select>
      <label htmlFor="types">Type:</label>
      <select name="types" onChange={handleSelectChange}>
        <option value="ANY">ANY</option>;
        {matchTypes.map((type) => {
          return (
            <option key={type} value={type}>{type}</option>
          );
        })}
      </select>
      <p>Order by</p>
      <button onClick={() => { changeFilter('order', 'desc') }}>Recent</button>
      <button onClick={() => { changeFilter('order', 'asc') }}>Oldest</button>
    </div>
  )
}

export default FilterBar