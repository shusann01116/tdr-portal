import type { Facility } from "../tdr/facility";
import { mockTdlResp, mockTdsResp } from "../tdr/fetcher.mock";
import { ParkType } from "../tdr/park";
import { toFacilityFromAttraction } from "./fetcher";
import type { API_Facility } from "./types";

export async function getFacilities(park: ParkType): Promise<Facility[]> {
  const [attractions, greetings] = await Promise.all([
    getAttractions(park),
    getGreetings(park),
  ]);
  return [...attractions, ...greetings];
}

export async function getAttractions(park: ParkType): Promise<Facility[]> {
  const mockData = park === ParkType.ParkTypeTDL ? mockTdlResp : mockTdsResp;
  return mockData.map((attraction) =>
    toFacilityFromAttraction(attraction as unknown as API_Facility),
  );
}

export async function getGreetings(park: ParkType): Promise<Facility[]> {
  // Implement mock greeting data
  return [];
}
