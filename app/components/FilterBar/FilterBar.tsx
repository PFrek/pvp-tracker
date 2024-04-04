import { IMatch } from '@/app/lib/definitions';
import styles from './FilterBar.module.css';

const FilterBar = ({ matches, filteredMatches, setFilteredMatches }: { matches: IMatch[], filteredMatches: IMatch[], setFilteredMatches: React.Dispatch<React.SetStateAction<IMatch[]>>}) => {


  const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  }

  const incrementDateByDays = (date: Date, daysToAdd: number): Date => {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate;
  }

  const filterMatchesByDate = (date: Date) => {
    return matches.filter((match) => {
      const matchDate = getDateString(new Date(match.date));
      return matchDate === getDateString(date);
    });
  }

  const filterMatchesByWeek = (date: Date) => {
    return matches.filter((match) => {
      const previousSunday = new Date(date.getTime());
      previousSunday.setDate(date.getDate() - date.getDay());
      previousSunday.setHours(0, 0, 0, 0);

      const nextSunday = incrementDateByDays(previousSunday, 7);

      const matchDate = new Date(match.date);
      return matchDate.getTime() >= previousSunday.getTime() && matchDate.getTime() < nextSunday.getTime();
    });
  };


  const filterMatches = (key: string, value?: string) => {
    if (key === 'date') {
      switch (value) {

        case 'today':
          setFilteredMatches(filterMatchesByDate(new Date()));
          break;

        case 'week':
          setFilteredMatches(filterMatchesByWeek(new Date()));
          break;

        default:
          setFilteredMatches(matches);
          return;
      }
    }
    else if(key === 'none') {
      setFilteredMatches(matches);
    }
  };

  const sortByDate = (order: string = "desc") => {
    console.log(`Sort: ${order}`)
    let sorted = filteredMatches;
    sorted.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();

      const result = (aTime - bTime) * (order === 'desc' ? -1 : 1);
      return result;
    });

    console.log("Sorted:");
    sorted.forEach((match) => {
      console.log(match.date);
    });
    setFilteredMatches([...sorted]);
  }


  return (
    <div className={styles.filters}>
      <button onClick={() => { filterMatches('date', 'today') }}>Today</button>
      <button onClick={() => { filterMatches('date', 'week') }}>This Week</button>
      <button onClick={() => { filterMatches('none') }}>All Time</button>
      <p>Order by</p>
      <button onClick={() => { sortByDate('desc') }}>Recent</button>
      <button onClick={() => { sortByDate('asc') }}>Oldest</button>
    </div>
  )
}

export default FilterBar