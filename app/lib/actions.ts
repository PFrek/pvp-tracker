"use server";
import { revalidatePath } from "next/cache";
import { IMatch, MatchType } from "./definitions";
import { ReadonlyURLSearchParams } from "next/navigation";

// function queryToString(query: ): string {
//   let queryString = '?';
//   Object.entries(query).forEach((pair) => {
//     queryString += `${pair[0]}=${pair[1]}&`;
//   });

//   return queryString.slice(0, -1);
// }

export async function getMatches(query: ReadonlyURLSearchParams) {
  const url = new URL('http://localhost:3001/matches');

  if (query) {
    url.search = new URLSearchParams(query).toString();
  }

  try {
    const res = await fetch(url, { cache: "no-store" });

    const matches: IMatch[] = await res.json();

    return matches;
  } catch (error) {
    console.error('Failed to fetch matches data.');
    return [];
  }
  return [];
}

export async function createMatch(formData: FormData) {
  const match: IMatch = {
    type: formData.get('type') as MatchType,
    map: formData.get('map') as string,
    job: formData.get('job') as string,
    result: parseInt(formData.get('result') as string),
    kills: parseInt(formData.get('kills') as string),
    deaths: parseInt(formData.get('deaths') as string),
    assists: parseInt(formData.get('assists') as string),
    date: new Date().toISOString(),
  };

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

  } catch (error) {
    console.error(error);
    console.log('Failed to create match!');
  }
};

export async function deleteMatch(matchId: number) {
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

  } catch (error) {
    console.error(error);
    console.log('Failed to delete match!');
  }
}

