import { IFilter, IMatch } from "@/app/lib/definitions";
import StatCard from "./StatCard/StatCard";
import styles from "./StatsSection.module.css";
import APIRepository from "@/app/lib/IMatchRepository";

const StatsSection = async ({ filters }: { filters: IFilter }) => {
  const matches = await APIRepository.getMatches(filters);

  const calculateWinRate = (matches: IMatch[]): string => {
    const wins = matches.reduce((count: number, match: IMatch) => {
      if (match.result === 1) {
        return count + 1;
      }
      return count;
    }, 0);

    const totalMatches = matches.length;
    const winRate = (wins / totalMatches) * 100;

    const formattedWinRate = winRate.toFixed(1);

    return formattedWinRate;
  };

  const calculateKDAStat = (stat: string): string => {
    const kdas = matches.map((match: IMatch) => {
      const kills = match.kills || 0;
      const deaths = match.deaths || 1; // Account 0 death games as 1 death for KDA calculation
      const assists = match.assists || 0;
      return (kills + assists) / deaths;
    });

    let calculatedStat: string;

    switch (stat) {
      case "avg":
        const kdaSum = kdas.reduce(
          (acc: number, current: number) => acc + current,
        );
        const avgKda = kdaSum / kdas.length;
        calculatedStat = avgKda.toFixed(2);
        break;

      case "best":
        const bestKda = Math.max(...kdas);
        calculatedStat = bestKda.toFixed(2);
        break;

      case "worst":
        const worstKda = Math.min(...kdas);
        calculatedStat = worstKda.toFixed(2);
        break;

      default:
        calculatedStat = "undefined";
        break;
    }

    return calculatedStat;
  };

  return (
    <div className={styles.container}>
        <>
          <StatCard title="Matches" value={matches.length.toString()} />
          <StatCard
            title="Wins"
            value={matches
              .filter((match) => match.result === 1)
              .length.toString()}
          />
          <StatCard title="Win Rate" value={matches && matches.length > 0 ? `${calculateWinRate(matches)}%` : "-"} />
          <StatCard title="Avg KDA" value={matches && matches.length > 0 ? `${calculateKDAStat("avg")}` : "-"} />
          <StatCard title="Best KDA" value={matches && matches.length > 0 ? `${calculateKDAStat("best")}` : "-"} />
          <StatCard title="Worst KDA" value={matches && matches.length > 0 ? `${calculateKDAStat("worst")}` : "-"} />
        </>
    </div>
  );
};

export default StatsSection;

