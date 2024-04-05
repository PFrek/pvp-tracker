import { IMatch } from '@/app/lib/definitions';
import StatCard from './StatCard/StatCard';
import styles from './StatsSection.module.css';
import { getMatches } from '@/app/lib/actions';

const StatsSection = async () => {

  const matches = await getMatches();

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

  const kdas = matches.map((match: IMatch) => {
    const kills = match.kills;
    const deaths = match.deaths || 1; // Account 0 death games as 1 death for KDA calculation
    const assists = match.assists;
    return (kills + assists) / deaths;
  });

  const calculateKDAStat = (kdas: number[], stat: string): string => {
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
            <StatCard title="Avg KDA" value={`${calculateKDAStat(kdas, 'avg')}`} />
            <StatCard title="Best KDA" value={`${calculateKDAStat(kdas, 'best')}`} />
            <StatCard title="Worst KDA" value={`${calculateKDAStat(kdas, 'worst')}`} />
          </>
        ) : (
          <p>No data found.</p>
        )
      }
    </div>
  )
}

export default StatsSection