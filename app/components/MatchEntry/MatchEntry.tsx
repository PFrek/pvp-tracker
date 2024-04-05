"use client";
import React from 'react'
import { IMatch } from '../../lib/definitions'
import clsx from 'clsx'
import styles from './MatchEntry.module.css'
import { deleteMatch } from '@/app/lib/actions';

const Match = ({ match }: { match: IMatch }) => {
  let resultIcon: string;
  let resultAltText: string;
  switch (match.result) {
    case 1:
      resultIcon = "/gold-medal.png";
      resultAltText = "1st Place icon"
      break;

    case 2:
      resultIcon = "/silver-medal.png";
      resultAltText = "2nd Place icon"
      break;

    case 3:
      resultIcon = "/bronze-medal.png";
      resultAltText = "3rd Place icon"
      break;


    default:
      resultIcon = "";
      resultAltText = "No Placement Info";
      break;
  }

  const handleDeleteButton = () => {
    const id = match.id!;
    deleteMatch(id);
  };

  return (
    <div className={
      clsx(
        styles.container,
        match.result === 1 ? styles.victory : styles.defeat
      )
    }>
      <div className={styles.header}>
        <div className={styles.playerInfo}>
          <p className={styles.label}>Job</p>
          <h3 className={styles.info}>{match.job}</h3> 
        </div>
        <div className={styles.performance}>
            <span className={styles.label}>K/D/A</span>
            <h3 className={styles.info}>{match.kills} / {match.deaths} / {match.assists}</h3>
        </div>
        {/* <Image src={resultIcon} alt={resultAltText} width="32" height="32" /> */}
      </div>
      <div className={styles.matchInfo}>
        <p>{match.type} ({match.map})</p>
        <button onClick={handleDeleteButton}>DEL</button>
      </div>
    </div>
  )
}

export default Match