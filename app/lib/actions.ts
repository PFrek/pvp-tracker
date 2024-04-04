"use server";
import { IMatch, MatchType } from "./definitions";
import fs from 'fs';

export async function addMatch(formData: FormData) {
  const {
    type,
    map,
    job,
    result,
    kills,
    deaths,
    assists
  } = Object.fromEntries(formData);

  const match: IMatch = {
    id: 1,
    type: type as MatchType,
    map: map as string,
    job: job as string,
    result: (result as unknown) as number,
    performance: {
      kills: (kills as unknown) as number,
      deaths: (deaths as unknown) as number,
      assists: (assists as unknown) as number
    },
    date: new Date().toISOString()
  }

  await appendToMatches(match);
}

async function appendToMatches(match: IMatch) {
  const filePath = 'app/tracker/matches.json';

  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    jsonData.push(match);

    await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));

    console.log('Match added to JSON file successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}