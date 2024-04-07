'use client';
import { IFilter, jobs } from '@/app/lib/definitions';
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
    return date.toISOString().split('T')[0];
  }

  const stringToFilter = (str: string): IFilter => {
    const today = new Date();
    const MS_IN_A_DAY = 24 * 60 * 60000;
    if (str === 'today') {
      return { date: getDateString(today), startDate: undefined, endDate: undefined };
    }
    else if (str === 'week') {
      const tuesOffset = (today.getDay() + 5) % 7; // Gets the offset in days from the previous tuesday
      const weekStart = new Date(today.getTime() - (tuesOffset * MS_IN_A_DAY));
      weekStart.setUTCHours(8);
      weekStart.setUTCMinutes(0);
      weekStart.setUTCSeconds(0);
      const weekEnd = new Date(weekStart.getTime() + 6 * MS_IN_A_DAY);
      weekEnd.setUTCHours(8);
      weekEnd.setUTCMinutes(0);
      weekEnd.setUTCSeconds(0);
      return { date: undefined, startDate: getDateString(weekStart), endDate: getDateString(weekEnd) };
    }
    else {
      return { date: undefined, startDate: undefined, endDate: undefined };
    }
  }

  const handleFilterChange = (type: string, value: string): void => {
    let newFilter: IFilter = {};
    if (type === 'date') {
      const dates = stringToFilter(value);
      newFilter = { ...newFilter, ...dates };
    }
    else if (type === 'order') {
      newFilter.order = value;
    }
    else if (type === ' job') {
      if (!jobs.includes(value)) {
        newFilter.job = '';
      }
      else {
        newFilter.job = value;
      }
    }

    const queryStr = createQueryString(newFilter);

    router.push(pathname + '?' + queryStr);
  }

  const handleJobChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const newJob = ev.currentTarget.value;
    let query = '';

    if (!jobs.includes(newJob)) {
      console.log('Job not found');
      query = createQueryString({ job: undefined });
    }
    else {
      console.log(newJob);
      query = createQueryString({ job: newJob });
    }

    router.push(pathname + '?' + query);
  }

  return (
    <div className={styles.filters}>
      <button onClick={() => { handleFilterChange('date', 'today') }}>Today</button>
      <button onClick={() => { handleFilterChange('date', 'week') }}>This Week</button>
      <button onClick={() => { handleFilterChange('date', 'all_time') }}>All Time</button>
      <select name="jobs" onChange={handleJobChange}>
        <option value="ANY">ANY</option>;
        {jobs.map((job) => {
          return (
            <option key={job} value={job}>{job}</option>
          );
        })};
      </select>
      <p>Order by</p>
      <button onClick={() => { handleFilterChange('order', 'desc') }}>Recent</button>
      <button onClick={() => { handleFilterChange('order', 'asc') }}>Oldest</button>
    </div>
  )
}

export default FilterBar