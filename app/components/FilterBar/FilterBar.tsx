"use client";
import {
  allJobs,
  getMapsByType,
  IFilter,
  jobs,
  MatchType,
  matchTypes,
} from "@/app/lib/definitions";
import styles from "./FilterBar.module.css";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButtonGroup from "./FilterButtonGroup/FilterButtonGroup";
import JobSelector from "../JobSelector/JobSelector";
import TypeSelector from "../TypeSelector/TypeSelector";
import MapSelector from "../MapSelector/MapSelector";

export interface IFilterButton {
  type: string;
  value: string;
  text: string;
  handler: (filter: string, value: string) => void;
}

const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [matchType, setMatchType] = useState<string>(
    searchParams.get("type") || "ANY",
  );
  const [matchMap, setMatchMap] = useState<string>(
    searchParams.get("map") || "ANY",
  );

  useEffect(() => {
    setMatchType(searchParams.get("type") || "ANY");
    setMatchMap(searchParams.get("map") || "ANY");

  }, [searchParams]);

  const createQueryString = useCallback(
    (filters: IFilter) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams],
  );

  const getDateString = (date: Date): string => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();

    const str = `${year}-${month}-${day}`;

    return str;
  };

  const stringToFilter = (str: string): IFilter => {
    const RESET_TIME = new Date();
    RESET_TIME.setUTCHours(8, 0, 0, 0);

    let today = new Date();

    // Adjust date if current time is before reset time
    if(today < RESET_TIME) {
        today.setUTCDate(today.getUTCDate() - 1);
    }
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const MS_IN_A_DAY = 24 * 60 * 60000;
    if (str === "today") {
      return {
        date: getDateString(today),
        startDate: undefined,
        endDate: undefined,
      };
    } else if (str === "week") {
      const tuesOffset = (today.getDay() + 5) % 7; // Gets the offset in days from the previous tuesday
      const weekStart = new Date(today.getTime() - tuesOffset * MS_IN_A_DAY);

      const weekEnd = new Date(weekStart.getTime() + 6 * MS_IN_A_DAY);

      return {
        date: undefined,
        startDate: getDateString(weekStart),
        endDate: getDateString(weekEnd),
      };
    } else {
      return { date: undefined, startDate: undefined, endDate: undefined };
    }
  };

  const changeFilter = (filter: string, value: string): void => {
    let newFilter: IFilter = {};
    if (filter === "date") {
      const dates = stringToFilter(value);
      newFilter = { ...newFilter, ...dates };
    } else if (filter === "order") {
      newFilter.order = value;
    } else if (filter === "job") {
      if (!allJobs.includes(value)) {
        newFilter.job = undefined;
      } else {
        newFilter.job = value;
      }
    } else if (filter === "type") {
      if (!matchTypes.includes(value)) {
        newFilter.type = undefined;
      } else {
        newFilter.type = value;
      }
      newFilter.map = undefined;
    } else if (filter === "map") {
      if (!getMapsByType(matchType as MatchType).includes(value)) {
        newFilter.map = undefined;
      } else {
        newFilter.map = value;
      }
    }

    if (Object.entries(newFilter).length) {
      const queryStr = createQueryString(newFilter);
      router.push(pathname + "?" + queryStr);
    }
  };

  const handleSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const filter = ev.target.name;
    const value = ev.target.value;
    changeFilter(filter, value);
  };

  return (
    <div className={styles.filters}>
      <FilterButtonGroup
        title="Date Filters"
        buttons={[
          {
            type: "date",
            value: "today",
            text: "Today",
            handler: changeFilter,
          },
          {
            type: "date",
            value: "week",
            text: "This Week",
            handler: changeFilter,
          },
          {
            type: "date",
            value: "all_time",
            text: "All Time",
            handler: changeFilter,
          },
        ]}
        defaultActive="all_time"
      />

      <TypeSelector
        hasAny={true}
        handleChange={handleSelectChange}
        selected={matchType}
      />
      {matchType !== "ANY" && (
        <MapSelector
          type={matchType}
          hasAny={true}
          handleChange={handleSelectChange}
        />
      )}
      <JobSelector hasAny={true} handleChange={handleSelectChange} />
      <FilterButtonGroup
        title="Order by"
        buttons={[
          {
            type: "order",
            value: "desc",
            text: "Recent",
            handler: changeFilter,
          },
          {
            type: "order",
            value: "asc",
            text: "Oldest",
            handler: changeFilter,
          },
        ]}
        defaultActive="desc"
      />
    </div>
  );
};

export default FilterBar;
