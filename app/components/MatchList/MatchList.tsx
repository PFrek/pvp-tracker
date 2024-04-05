import React from 'react'
import Match from '../MatchEntry/MatchEntry';
import styles from './MatchList.module.css';
import { getMatches } from '@/app/lib/actions';

const MatchList = async () => {

  const matches = await getMatches();

  return (
    <div className={styles.container}>
      {/* <FilterBar matches={matches} filteredMatches={filteredMatches} setFilteredMatches={setFilteredMatches} /> */}
      {matches && matches.length > 0 ? (
        matches.map((match) => {
          return (
            <Match key={match.id} match={match} />
          );
        })
      ) :
        <h2>No matches found.</h2>
      }
    </div>
  )
}

export default MatchList