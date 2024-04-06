import { IFilter, IMatch } from '@/app/lib/definitions';
import StatCard from './StatCard/StatCard';
import styles from './StatsSection.module.css';
import APIRepository from '@/app/lib/IMatchRepository';

const StatsSection = async ({ filter }: { filter: IFilter }) => {

  const matches = await APIRepository.getMatches(filter);

  const calculateWinRate = (matches: IMatch[]): string => {
    const wins = matches.reduce(
      (count: number, match: IMatch) => {
        if (match.result === 1) {
          return count + 1;
        }
        return count;
      }, 0
    );

    const totalMatches = matches.length;
    const winRate = (wins / totalMatches) * 100;

    const formattedWinRate = winRate.toFixed(1);

    return formattedWinRate;
  }


  const calculateKDAStat = (stat: string): string => {
    const kdas = matches.map((match: IMatch) => {
      const kills = match.kills;
      const deaths = match.deaths || 1; // Account 0 death games as 1 death for KDA calculation
      const assists = match.assists;
      return (kills + assists) / deaths;
    });

    let calculatedStat: string;

    switch (stat) {

      case 'avg':
        const kdaSum = kdas.reduce((acc: number, current: number) => acc + current);
        const avgKda = kdaSum / kdas.length;
        calculatedStat = avgKda.toFixed(2);
        break;

      case 'best':
        const bestKda = Math.max(...kdas);
        calculatedStat = bestKda.toFixed(2);
        break;

      case 'worst':
        const worstKda = Math.min(...kdas);
        calculatedStat = worstKda.toFixed(2);
        break;

      default:
        calculatedStat = "undefined";
        break;

    }

    return calculatedStat;
  }


  return (
    <div className={styles.container}>
      {
        matches && matches.length > 0 ? (
          <>
            <StatCard title="Win Rate" value={`${calculateWinRate(matches)}%`} />
            <StatCard title="Avg KDA" value={`${calculateKDAStat('avg')}`} />
            <StatCard title="Best KDA" value={`${calculateKDAStat('best')}`} />
            <StatCard title="Worst KDA" value={`${calculateKDAStat('worst')}`} />
          </>
        ) : (
          <p>No data found.</p>
        )
      }
    </div>
  )
}

export default StatsSection