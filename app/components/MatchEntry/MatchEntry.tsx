import React from 'react'
import { IMatch } from '../../lib/definitions'
import clsx from 'clsx'
import styles from './MatchEntry.module.css'
import DeleteButton from './DeleteButton/DeleteButton';

const Match = ({ match }: { match: IMatch }) => {
    if (match) {
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
                <p>{new Date(match.date!).toLocaleString()}</p>
                <div className={styles.buttons}>
                    <DeleteButton matchId={match.id as number} />
                </div>
            </div>
        )
    } else {
        return (
            <p>No data found</p>
        )
    }
}

export default Match