import React from 'react'
import { IMatch } from '../lib/definitions'
import clsx from 'clsx'
import Image from 'next/image'

const Match = ({ match, index }: { match: IMatch, index: number }) => {
  let resultIcon: string;
  switch (match.result) {
    case 1:
      resultIcon = "/gold-medal.png";
      break;

    case 2:
      resultIcon = "/silver-medal.png";
      break;

    case 3:
      resultIcon = "/bronze-medal.png";
      break;

  
    default:
      resultIcon = "";
      break;
  }

  return (
    <div className={clsx(
      "mb-2 rounded-xl",
      {
        "bg-primary text-primary-content": index % 2 === 1,
        "bg-secondary text-secondary-content": index % 2 === 0
      }
    )}>
      <div className="px-5 py-3">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{match.type} - {match.map}</h2>
          <Image src={resultIcon} alt={`${match.result} Place icon`} width="32" height="32"/>
        </div>
        <p className="text">{match.job} - {match.performance.kills} / {match.performance.deaths} / {match.performance.assists}</p>
      </div>
    </div>
  )
}

export default Match