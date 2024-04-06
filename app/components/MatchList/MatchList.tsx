import React from 'react'
import Match from '../MatchEntry/MatchEntry';
import styles from './MatchList.module.css';
import { IFilter } from '@/app/lib/definitions';
import APIRepository from '@/app/lib/IMatchRepository';

const MatchList = async ({ filter }: { filter: IFilter }) => {

  const matches = await APIRepository.getMatches(filter);

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