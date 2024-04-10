import { MatchType, getMapsByType } from "@/app/lib/definitions";
import { ChangeEvent } from "react";

const MapSelector = ({
  type,
  hasAny,
  handleChange,
}: {
  type: string;
  hasAny: boolean;
  handleChange: (ev: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="map">Map: </label>
      <select className="largeSelect" name="map" onChange={handleChange}>
        {hasAny && <option value="ANY">ANY</option>}
        {getMapsByType(type as MatchType).map((map) => {
          return (
            <option key={map} value={map}>
              {map}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default MapSelector;
