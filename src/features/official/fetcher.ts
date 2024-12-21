import type { API_Facility, API_Greetings } from "@/features/official/types";
import type { Facility } from "@/features/tdr/facility";
import { unstable_cache } from "next/cache";
import { RAW_FACILITY_DATA } from "../tdr/const/raw/facility";
import { getLink } from "../tdr/link";
import type { ParkType } from "../tdr/park";

export async function getFacilities(park: ParkType): Promise<Facility[]> {
  const [attractions, greetings] = await Promise.all([
    getCachedAttractions(park),
    getCachedGreetings(park),
  ]);

  return [...attractions, ...greetings];
}

const getCachedAttractions = unstable_cache(
  async (park: ParkType) => {
    return getAttractions(park);
  },
  ["attractions"],
  { revalidate: 60 },
);

async function getAttractions(park: ParkType): Promise<Facility[]> {
  const link = getLink(park);
  if (link == null) {
    return [];
  }

  const attractions = await getData(link?.attraction);
  if (attractions == null) {
    return [];
  }

  const facilities = JSON.parse(attractions) as API_Facility[];
  return facilities.map(toFacilityFromAttraction);
}

const getCachedGreetings = unstable_cache(
  async (park: ParkType) => {
    return getGreetings(park);
  },
  ["greetings"],
  { revalidate: 60 },
);

async function getGreetings(park: ParkType): Promise<Facility[]> {
  const link = getLink(park);
  if (link == null) {
    return [];
  }

  const greetings = await getData(link.greeting);
  if (greetings == null) {
    return [];
  }

  const parsedData = JSON.parse(greetings) as API_Greetings;
  const facilities: Facility[] = [];

  for (const area of Object.values(parsedData)) {
    for (const facility of area.Facility) {
      const facilityResp = toFacilityFromGreeting(facility);
      if (facilityResp) {
        facilities.push(facilityResp);
      }
    }
  }

  return facilities;
}

async function getData(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
    },
  });

  if (!res.ok) {
    return null;
  }

  return res.text();
}

export function toFacilityFromAttraction(f: API_Facility): Facility {
  return {
    id: f.FacilityID,
    name: f.FacilityName,
    operatingStatus: {
      id: f.OperatingStatusCD ?? f.FacilityStatusCD ?? "",
      name: f.OperatingStatus ?? f.FacilityStatus ?? "",
    },
    operatingHour: {
      from: new Date(`${f.OperatingHoursFromDate} ${f.OperatingHoursFrom}:00`),
      to: new Date(`${f.OperatingHoursToDate} ${f.OperatingHoursTo}:00`),
    },
    standbyTime: {
      dateTime: new Date(f.UpdateTime),
      time:
        typeof f.StandbyTime === "string"
          ? Number.parseInt(f.StandbyTime, 10)
          : 0,
    },
    updatedAt: new Date(f.UpdateTime),
    facilityImage: {
      main: {
        url:
          RAW_FACILITY_DATA.find((facility) => facility.str_id === f.FacilityID)
            ?.thum_name ?? "",
        alt: `${f.FacilityName}のメイン画像`,
      },
    },
  };
}

export function toFacilityFromGreeting(f: API_Facility): Facility | undefined {
  const greeting = f.greeting;
  if (!greeting) return undefined;

  const operatingHours = greeting.operatinghours?.[0] || {};

  return {
    id: greeting.FacilityID,
    name: greeting.FacilityName,
    operatingStatus: {
      id: operatingHours.OperatingStatusCD ?? "",
      name: operatingHours.OperatingStatus ?? "",
    },
    operatingHour: {
      from: new Date(
        `${operatingHours.OperatingHoursFromDate} ${operatingHours.OperatingHoursFrom}:00`,
      ),
      to: new Date(
        `${operatingHours.OperatingHoursToDate} ${operatingHours.OperatingHoursTo}:00`,
      ),
    },
    standbyTime: {
      dateTime: new Date(greeting.UpdateTime),
      time:
        typeof greeting.StandbyTime === "string"
          ? Number.parseInt(greeting.StandbyTime, 10)
          : 0,
    },
    updatedAt: new Date(greeting.UpdateTime),
    facilityImage: {
      main: {
        url:
          RAW_FACILITY_DATA.find(
            (facility) => facility.str_id === greeting.FacilityID,
          )?.thum_name ?? "",
        alt: `${greeting.FacilityName}のメイン画像`,
      },
    },
  };
}
