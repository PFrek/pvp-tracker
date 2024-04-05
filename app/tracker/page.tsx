import React, { useState } from 'react'
import MatchList from '../components/MatchList/MatchList';
import PageTitle from '../components/PageTitle';
import styles from './tracker.module.css';
import StatsSection from '../components/StatsSection/StatsSection';
import FilterBar from '../components/FilterBar/FilterBar';
import MatchInput from '../components/MatchInput/MatchInput';

const Tracker = async () => {

  return (
    <>
      <header className={styles.header}>
        <PageTitle title="PVP Tracker" />
      </header>
      <section className={styles.matchInputSection}>
        <MatchInput />
      </section>
      <section className={styles.contentSection}>
        <MatchList />
        <StatsSection />
      </section>
    </>
  )
}

export default Tracker;