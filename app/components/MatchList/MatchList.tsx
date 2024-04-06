'use client';
import React, { Suspense, useEffect, useState } from 'react'
import Match from '../MatchEntry/MatchEntry';
import styles from './MatchList.module.css';
import { getMatches } from '@/app/lib/actions';
import { IMatch } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';

const MatchList = () => {
  const searchParams = useSearchParams();
  const [matches, setMatches] = useState<IMatch[]>();

  useEffect(() => {
    const fetchMatches = async () => {
      const matches = await getMatches(searchParams);
      setMatches(matches);
    }

    fetchMatches();
  });


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