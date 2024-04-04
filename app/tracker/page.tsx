"use client";

import React, { useState } from 'react'
import matches from '@/app/tracker/matches.json';
import MatchList from '../components/MatchList/MatchList';
import PageTitle from '../components/PageTitle';
import styles from './tracker.module.css';
import StatsSection from '../components/StatsSection/StatsSection';
import { IMatch } from '../lib/definitions';
import FilterBar from '../components/FilterBar/FilterBar';
import MatchInput from '../components/MatchInput/MatchInput';

const Tracker = () => {
  const [filteredMatches, setFilteredMatches] = useState<IMatch[]>(matches);
  console.log(filteredMatches);



  return (
    <>
      <header className={styles.header}>
        <PageTitle title="PVP Tracker" />
      </header>
      <section className={styles.matchInputSection}>
        <MatchInput /> 
      </section>
      <section className={styles.contentSection}>
        <div className={styles.matchListSection}>
          <FilterBar matches={matches} filteredMatches={filteredMatches} setFilteredMatches={setFilteredMatches} />
          <MatchList matches={filteredMatches} />
        </div>
        <StatsSection matches={filteredMatches} />
      </section>
    </>
  )
}

export default Tracker;