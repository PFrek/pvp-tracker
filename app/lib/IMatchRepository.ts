import { revalidatePath } from "next/cache";
import { IFilter, IMatch } from "./definitions";

export interface IMatchRepository {
  getMatches(filter: IFilter): Promise<IMatch[]>;
  createMatch(match: IMatch): Promise<boolean>;
  deleteMatch(matchId: number): Promise<boolean>;
}

function filterToQueryString(filter: IFilter): string {
  let queryString = '?';
  Object.entries(filter).forEach((pair) => {
    if (pair[1] !== undefined) {
      queryString += `${pair[0]}=${pair[1]}&`;
    }
  });

  return queryString.slice(0, -1);
}

class APIRepository implements IMatchRepository {

  async getMatches(filter: IFilter): Promise<IMatch[]> {
    const queryString = filterToQueryString(filter);

    const url = new URL(`http://localhost:3001/matches${queryString}`);

    try {
      const res = await fetch(url, { 
        cache: "no-store",
      });

      const matches: IMatch[] = await res.json();

      return matches;
    } catch (error) {
      console.error('Failed to fetch matches data.');
      return [];
    }
  }

  async createMatch(match: IMatch): Promise<boolean> {
    try {
      const res = await fetch('http://localhost:3001/matches', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(match)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(`Failed to create Match in DB!: ${JSON.stringify(data)}`);
        return false;
      }

      console.log('Succesfully created match in DB. Match id:', data.id);
      revalidatePath('/tracker');

      return true;
    } catch (error) {
      console.error(error);
      console.log('Failed to create match!');

      return false;
    }
  }

  async deleteMatch(matchId: number): Promise<boolean> {
    try {
      const res = await fetch(`http://localhost:3001/matches/${matchId}`, {
        method: 'DELETE',
      })

      const data = await res.json();

      if (!res.ok) {
        console.error(`Failed to delete Match in DB!: ${JSON.stringify(data)}`);
        return false;
      }

      console.log(JSON.stringify(data.msg));
      revalidatePath('/tracker');

      return true;

    } catch (error) {
      console.error(error);
      console.log('Failed to delete match!');

      return false;
    }
  }

}

const repository = new APIRepository();
export default repository;
