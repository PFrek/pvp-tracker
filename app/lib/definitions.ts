export type MatchType = "Frontline" | "CC" | "Rival Wings" | undefined;

export interface IMatch {
  id?: number;
  type: MatchType;
  map: string;
  job: string;
  result: number;
  kills: number;
  deaths: number;
  assists: number;
  date: string;
}

export const matchTypes = ["Frontline", "CC", "Rival Wings"];

export const getMapsByType = (type: MatchType) => {
  return type === 'Frontline' ? [
    // "The Borderland Ruins",
    "Seal Rock",
    "The Fields of Glory",
    "Onsal Hakair"
  ] : type === 'CC' ? [
    "The Palaistra",
    "The Volcanic Heart",
    "Cloud Nine",
    "The Clockwork Castletown",
    "The Red Sands",
  ] : type === 'Rival Wings' ? [
    // "Astragalos",
    "Hidden Gorge",
  ] : []
}

export const jobs = [
  "PLD", "WAR", "DRK", "GNB",
  "WHM", "SCH", "AST", "SGE",
  "MNK", "DRG", "NIN", "SAM", "RPR",
  "BRD", "MCH", "DNC",
  "BLM", "SMN", "RDM",
]
