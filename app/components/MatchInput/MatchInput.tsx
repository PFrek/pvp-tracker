"use client";
import { ChangeEvent, useState } from 'react';
import styles from './MatchInput.module.css';
import { addMatch } from '@/app/lib/actions';

const MatchInput = () => {
  const [type, setType] = useState("Frontline");

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value);
  }

  const matchTypes = ["Frontline", "CC", "Rival Wings"];

  const matchMaps = type === 'Frontline' ? [
    // "The Borderland Ruins",
    "Seal Rock",
    "The Fields of Glory",
    "Onsal Hakair"
  ] : type === 'CC' ? [
    "The Palaistra",
    "The Volcanic Heart",
    "Cloud Nine",
    "The Clockwork Castletown",
    "The Red Sands",
  ] : type === 'Rival Wings' ? [
    // "Astragalos",
    "Hidden Gorge",
  ] : []

  const jobs = [
    "PLD", "WAR", "DRK", "GNB",
    "WHM", "SCH", "AST", "SGE",
    "MNK", "DRG", "NIN", "SAM", "RPR",
    "BRD", "MCH", "DNC",
    "BLM", "SMN", "RDM",
  ]

  return (
    <div className={styles.container}>
      <form action={addMatch}>
        <select name="type" onChange={handleTypeChange}>
          {matchTypes.map((type) =>
            <option key={type[0]} value={type}>{type}</option>
          )}
        </select>
        <select name="map">
          {
            matchMaps.map((map) => {
              return (
                <option key={map} value={map}>{map}</option>
              );
            })
          }
        </select>
        <select name="job">
          {
            jobs.map((job) => {
              return (
                <option key={job} value={job}>{job}</option>
              )
            })
          }
        </select>
        <select name="result">
          <option value={1}>1st Place</option>
          <option value={2}>2nd Place</option>
          {type === 'Frontline' && <option value={3}>3rd Place</option>}
        </select>
        <div className={styles.kdaContainer}>
          <label htmlFor='kills'>Kills: </label>
          <input type="number" name="kills" min={0} defaultValue={0} />
        </div>
        <div className={styles.kdaContainer}>
          <label htmlFor='deaths'>Deaths: </label>
          <input type="number" name="deaths" min={0} defaultValue={0} />
        </div>
        <div className={styles.kdaContainer}>
          <label htmlFor='assists'>Assists: </label>
          <input type="number" name="assists" min={0} defaultValue={0} />
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default MatchInput