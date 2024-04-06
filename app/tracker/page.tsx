'use client';
import React, { useState } from 'react'
import MatchList from '../components/MatchList/MatchList';
import PageTitle from '../components/PageTitle';
import styles from './tracker.module.css';
import StatsSection from '../components/StatsSection/StatsSection';
import FilterBar from '../components/FilterBar/FilterBar';
import MatchInput from '../components/MatchInput/MatchInput';
import { IFilter } from '../lib/definitions';


const Tracker = () => {
  const [filter, setFilter] = useState<IFilter>({});

  const filterToString = (filter: IFilter) => {
    let str = ''; 
    Object.keys(filter).forEach((key) => {
      str += key + ' ';
    });
    return str;
  }

  return (
    <>
      <header className={styles.header}>
        <PageTitle title="PVP Tracker" />
        
        {/* <p>Current filter: {filterToString(filter)}</p> */}
      </header>
      <section className={styles.matchInputSection}>
        <MatchInput />
      </section>
      <section className={styles.contentSection}>
        {/* <FilterBar filter={filter} setFilter={setFilter} /> */}
        <MatchList filter={filter}/>
        <StatsSection filter={filter}/>
      </section>
    </>
  )
}

export default Tracker;