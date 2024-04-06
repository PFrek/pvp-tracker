"use server";
import { revalidatePath } from "next/cache";
import { IFilter, IMatch, MatchType } from "./definitions";
import APIRepository from "./IMatchRepository";


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

  const result = await APIRepository.createMatch(match);
  return result;
};

export async function deleteMatch(matchId: number) {
  console.log('OK');
  const result = await APIRepository.deleteMatch(matchId);
  return result;
}

