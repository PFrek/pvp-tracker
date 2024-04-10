"use client";
import { ChangeEvent, useState } from "react";
import styles from "./MatchInput.module.css";
import { createMatch } from "@/app/lib/actions";
import {
  getMapsByType,
  jobs,
  MatchType,
  matchTypes,
} from "@/app/lib/definitions";
import JobSelector from "../JobSelector/JobSelector";
import TypeSelector from "../TypeSelector/TypeSelector";
import MapSelector from "../MapSelector/MapSelector";

const MatchInput = () => {
  const [type, setType] = useState<MatchType>("Frontline");

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value as MatchType);
  };

  return (
    <div className={styles.container}>
      <form action={createMatch}>
        <div className={styles.typeMapContainer}>
          <div className={styles.labelGroup}>
            <TypeSelector
              hasAny={false}
              handleChange={handleTypeChange}
              selected={type!}
            />
          </div>
          <div className={styles.labelGroup}>
            <MapSelector type={type!} hasAny={false} handleChange={() => {}} />
          </div>
        </div>
        <div className={styles.playerContainer}>
          <div className={styles.labelGroup}>
            <JobSelector hasAny={false} handleChange={() => {}} />
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor="result">Result: </label>
            <select className="largeSelect" name="result">
              <option value={1}>1st Place</option>
              <option value={2}>2nd Place</option>
              {type === "Frontline" && <option value={3}>3rd Place</option>}
            </select>
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor="kills">Kills: </label>
            <input
              className={styles.number}
              type="number"
              name="kills"
              min={0}
              max={99}
              defaultValue={0}
            />
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor="deaths">Deaths: </label>
            <input
              className={styles.number}
              type="number"
              name="deaths"
              min={0}
              max={99}
              defaultValue={0}
            />
          </div>
          <div className={styles.labelGroup}>
            <label htmlFor="assists">Assists: </label>
            <input
              className={styles.number}
              type="number"
              name="assists"
              min={0}
              max={99}
              defaultValue={0}
            />
          </div>
          <button className={styles.addButton}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default MatchInput;
