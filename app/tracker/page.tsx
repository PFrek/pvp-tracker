import MatchList from '../components/MatchList/MatchList';
import PageTitle from '../components/PageTitle';
import styles from './tracker.module.css';
import StatsSection from '../components/StatsSection/StatsSection';
import MatchInput from '../components/MatchInput/MatchInput';
import { IFilter } from '../lib/definitions';
import FilterBar from '../components/FilterBar/FilterBar';


const Tracker = ({ searchParams }: { searchParams: {}}) => {

  const filters: IFilter = searchParams;

  return (
    <>
      <header className={styles.header}>
        <PageTitle title="PVP Tracker" />
      </header>
      <section className={styles.matchInputSection}>
        <MatchInput />
      </section>
      <section className={styles.contentSection}>
        <FilterBar />
        <MatchList filters={filters}/>
        <StatsSection filters={filters}/>
      </section>
    </>
  )
}

export default Tracker;