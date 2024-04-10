"use client";
import { jobs } from "@/app/lib/definitions";
import JobGroup from "./JobGroup/JobGroup";
import { ChangeEvent } from "react";

const JobSelector = ({
  hasAny,
  handleChange,
}: {
  hasAny: boolean;
  handleChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="job">Job: </label>
      <select className="largeSelect" name="job" onChange={handleChange}>
        {hasAny && <option value="ANY">ANY</option>}
        <JobGroup label="Tanks" jobs={jobs.tanks} />
        <JobGroup label="Healers" jobs={jobs.healers} />
        <JobGroup label="Melee" jobs={jobs.melee} />
        <JobGroup label="Ranged" jobs={jobs.physRanged} />
        <JobGroup label="Caster" jobs={jobs.magRanged} />
      </select>
    </>
  );
};

export default JobSelector;
