"use client";
import { ChangeEvent, useState } from 'react';
import styles from './MatchInput.module.css';
import { createMatch } from '@/app/lib/actions';
import { getMapsByType, jobs, MatchType, matchTypes } from '@/app/lib/definitions';

const MatchInput = () => {
  const [type, setType] = useState<MatchType>("Frontline");

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value as MatchType);
  }

  const jobsSelector = [];


  return (
    <div className={styles.container}>
      <form action={createMatch}>
        <div className={styles.typeMapContainer}>
          <div className={styles.labelGroup}>
            <label htmlFor="type">PVP Type: </label>
            <select className={styles.largeSelect} name="type" onChange={handleTypeChange}>
              {matchTypes.map((type) =>
                <option key={type[0]} value={type}>{type}</option>
              )}
            </select>
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor="map">Map: </label>
            <select className={styles.largeSelect} name="map">
              {
                getMapsByType(type).map((map) => {
                  return (
                    <option key={map} value={map}>{map}</option>
                  );
                })
              }
            </select>
          </div>
        </div>
        <div className={styles.playerContainer}>
          <div className={styles.labelGroup}>
          <label htmlFor="job">Job: </label>
          <select className={styles.smallSelect} name="job">
            {
              jobs.map((job) => {
                return (
                  <option key={job} value={job}>{job}</option>
                )
              })
            }
          </select>
          </div>
          <div className={styles.labelGroup}>
          <label htmlFor="result">Result: </label>
          <select className={styles.smallSelect} name="result">
            <option value={1}>1st Place</option>
            <option value={2}>2nd Place</option>
            {type === 'Frontline' && <option value={3}>3rd Place</option>}
          </select>
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor='kills'>Kills: </label>
            <input className={styles.number} type="number" name="kills" min={0} max={99} defaultValue={0} />
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor='deaths'>Deaths: </label>
            <input className={styles.number} type="number" name="deaths" min={0} max={99} defaultValue={0} />
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor='assists'>Assists: </label>
            <input className={styles.number} type="number" name="assists" min={0} max={99} defaultValue={0} />
          </div>
          <button className={styles.addButton}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default MatchInput