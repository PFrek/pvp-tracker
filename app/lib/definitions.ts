export type MatchType = "Frontline" | "CC" | "Rival Wings" | undefined;

export interface IMatch {
  id?: number | null;
  type: MatchType | null;
  map: string | null;
  job: string | null;
  result: number | null;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  date: string | null;
}

export type IFilter = {
  type?: string;
  map?: string;
  job?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  order?: string;
};

export const matchTypes = ["Frontline", "CC", "Rival Wings"];

export const getMapsByType = (type: MatchType) => {
  return type === "Frontline"
    ? [
        // "The Borderland Ruins",
        "Seal Rock",
        "The Fields of Glory",
        "Onsal Hakair",
      ]
    : type === "CC"
      ? [
          "The Palaistra",
          "The Volcanic Heart",
          "Cloud Nine",
          "The Clockwork Castletown",
          "The Red Sands",
        ]
      : type === "Rival Wings"
        ? [
            // "Astragalos",
            "Hidden Gorge",
          ]
        : [];
};

export type JobsList = {
  tanks: string[];
  healers: string[];
  melee: string[];
  physRanged: string[];
  magRanged: string[];
};

export const jobs: JobsList = {
  tanks: ["PLD", "WAR", "DRK", "GNB"],
  healers: ["WHM", "SCH", "AST", "SGE"],
  melee: ["MNK", "DRG", "NIN", "SAM", "RPR"],
  physRanged: ["BRD", "MCH", "DNC"],
  magRanged: ["BLM", "SMN", "RDM"],
};

export const allJobs: string[] = [
  ...jobs.tanks,
  ...jobs.healers,
  ...jobs.melee,
  ...jobs.physRanged,
  ...jobs.magRanged,
];
