export type MatchType = "Frontline" | "CC" | "Rival Wings" | undefined;

export interface IMatch {
  id: number;
  type: MatchType;
  map: string;
  job: string;
  result: number;
  performance: {
    kills: number;
    deaths: number;
    assists: number;
  }
  date: string;
}
