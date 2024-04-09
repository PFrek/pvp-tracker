'use client';
import { getMapsByType, IFilter, jobs, MatchType, matchTypes } from '@/app/lib/definitions';
import styles from './FilterBar.module.css';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterButtonGroup from './FilterButtonGroup/FilterButtonGroup';

export interface IFilterButton {
  type: string,
  value: string,
  text: string,
  handler: (filter: string, value: string) => void,
}


const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [matchType, setMatchType] = useState<string>(searchParams.get('type') || 'ANY');
  const [matchMap, setMatchMap] = useState<string>(searchParams.get('map') || 'ANY');

  useEffect(() => {
    setMatchType(searchParams.get('type') || 'ANY');
    setMatchMap(searchParams.get('map') || 'ANY');
  }, [searchParams]);

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
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate()) 

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

  const changeFilter = (filter: string, value: string): void => {
    let newFilter: IFilter = {};
    if (filter === 'date') {
      const dates = stringToFilter(value);
      newFilter = { ...newFilter, ...dates };
    }
    else if (filter === 'order') {
      newFilter.order = value;
    }
    else if (filter === 'jobs') {
      if (!jobs.includes(value)) {
        newFilter.job = undefined;
      }
      else {
        newFilter.job = value;
      }
    }
    else if (filter === 'types') {
      if (!matchTypes.includes(value)) {
        newFilter.type = undefined;
      }
      else {
        newFilter.type = value;
      }
      newFilter.map = undefined;
    }
    else if (filter === 'maps') {
      if (!getMapsByType(matchType as MatchType).includes(value)) {
        newFilter.map = undefined;
      }
      else {
        newFilter.map = value;
      }
      console.log(newFilter.map);
    }

    if (Object.entries(newFilter).length) {
      const queryStr = createQueryString(newFilter);
      router.push(pathname + '?' + queryStr);
    }
  }


  const handleSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const filter = ev.currentTarget.name;
    const value = ev.currentTarget.value;
    changeFilter(filter, value);
  }

  return (
    <div className={styles.filters}>
      <FilterButtonGroup title='Date Filters' buttons={
        [
          { type: 'date', value: 'today', text: 'Today', handler: changeFilter},
          { type: 'date', value: 'week', text: 'This Week', handler: changeFilter },
          { type: 'date', value: 'all_time', text: 'All Time', handler: changeFilter },
        ]
      }/>

      <label htmlFor="types">Type:</label>
      <select name="types" onChange={handleSelectChange} value={matchType}>
        <option value="ANY">ANY</option>
        {matchTypes.map((type) => {
          return (
            <option key={type} value={type}>{type} </option>
          );
        })}
      </select>
      {matchType !== 'ANY' && (
        <>
          <label htmlFor="maps">Map:</label>
          <select name="maps" value={matchMap} onChange={handleSelectChange}>
            <option value="ANY">ANY</option>
            {getMapsByType(matchType as MatchType).map((map) => {
              return (
                <option key={map} value={map}>{map}</option>
              )
            })}
          </select>
        </>
      )}
      <label htmlFor="jobs">Job:</label>
      <select name="jobs" onChange={handleSelectChange}>
        <option value="ANY">ANY</option>;
        {jobs.map((job) => {
          return (
            <option key={job} value={job}>{job}</option>
          );
        })}
      </select>
      <FilterButtonGroup title='Order by' buttons={
        [
          { type: 'order', value: 'desc', text: 'Recent', handler: changeFilter},
          { type: 'order', value: 'asc', text: 'Oldest', handler: changeFilter },
        ]
      }/>
      {/* <p>Order by</p>
      <button onClick={() => { changeFilter('order', 'desc') }}>Recent</button>
      <button onClick={() => { changeFilter('order', 'asc') }}>Oldest</button> */}
    </div>
  )
}

export default FilterBar