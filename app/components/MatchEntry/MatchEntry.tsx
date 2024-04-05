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
      <div className={styles.matchInfo}>
        <div className={styles.infoSlot}>
          <p className={styles.label}>Job</p>
          <h3 className={styles.info}>{match.job}</h3>
        </div>
        <div className={styles.infoSlot}>
          <span className={styles.label}>K/D/A</span>
          <h3 className={styles.info}>{match.kills} / {match.deaths} / {match.assists}</h3>
        </div>
        <div className={styles.infoSlot}>
          <span className={styles.label}>Type (Map)</span>
          <h3 className={styles.info}>{match.type} ({match.map})</h3>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.deleteButton} onClick={handleDeleteButton}>DEL</button>
      </div>
    </div>
  )
}

export default Match