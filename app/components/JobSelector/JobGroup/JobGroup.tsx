import clsx from "clsx";
import styles from "./JobGroup.module.css";

const JobGroup = ({ label, jobs }: { label: string; jobs: string[] }) => {
  return (
    <optgroup
      className={clsx(
        label === "Tanks" && styles.groupTanks,
        label === "Healers" && styles.groupHealers,
        ["Melee", "Ranged", "Caster"].includes(label) && styles.groupDPS,
      )}
      label={label}
    >
      {jobs.map((job) => {
        return (
          <option key={job} value={job}>
            {job}
          </option>
        );
      })}
    </optgroup>
  );
};

export default JobGroup;
