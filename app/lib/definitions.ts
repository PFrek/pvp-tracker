
export interface IMatch {
  id: number;
  type: string;
  map: string;
  job: string;
  result: number;
  performance: {
    kills: number;
    deaths: number;
    assists: number;
  }
}
