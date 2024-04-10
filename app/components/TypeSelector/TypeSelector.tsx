import { ChangeEvent } from "react";
import { matchTypes } from "@/app/lib/definitions";

const TypeSelector = ({
  hasAny,
  handleChange,
  selected,
}: {
  hasAny: boolean;
  handleChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
}) => {
  return (
    <>
      <label htmlFor="type">PVP Type: </label>
      <select
        className="largeSelect"
        name="type"
        onChange={handleChange}
        value={selected}
      >
        {hasAny && <option value="ANY">ANY</option>}
        {matchTypes.map((type) => (
          <option key={type[0]} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  );
};

export default TypeSelector;
