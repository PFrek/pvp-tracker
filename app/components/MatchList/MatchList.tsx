import React from 'react'
import { IMatch } from '../../lib/definitions'
import Match from '../MatchEntry/MatchEntry';
import styles from './MatchList.module.css';

const MatchList = ({ matches }: { matches: IMatch[] }) => {
  return (
    <div className={styles.container}>
      {matches.length > 0 ? (
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