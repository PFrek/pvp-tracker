import React from 'react'
import Match from '../MatchEntry/MatchEntry';
import styles from './MatchList.module.css';
import APIRepository from '@/app/lib/IMatchRepository';
import { IFilter } from '@/app/lib/definitions';

const MatchList = async ({ filters }: { filters: IFilter }) => {

  const matches = await APIRepository.getMatches(filters);

  return (
    <div className={styles.container}>
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