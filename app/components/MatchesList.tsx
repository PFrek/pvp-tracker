import React from 'react'
import { IMatch } from '../lib/definitions'
import Match from './Match';

const MatchesList = ({ matches }: { matches: IMatch[] }) => {
  return (
    <ul className="overflow-auto max-h-96">
      {matches.map((match, index) => {
        return (
          <Match key={match.id} match={match} index={index} />
        );
      })}
    </ul>
  )
}

export default MatchesList