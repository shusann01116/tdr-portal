import { getFacilities } from "@/features/official/fetcher";
import { ParkType } from "@/features/tdr/park";

export type FacilityId = string;

export type Facility = {
  id: FacilityId;
  name: string;
  operatingStatus: OperatingStatus;
  operatingHour: OperatingHour;
  standbyTime: StandbyTime;
  updatedAt: Date;
  facilityDescription?: string;
  facilityImage?: FacilityImage;
};

export type OperatingStatus = {
  id: string;
  name: string;
};

export type OperatingHour = {
  from: Date;
  to: Date;
};

export type StandbyTime = {
  dateTime: Date;
  time: number;
};

type Image = {
  url: string;
  alt: string | undefined;
};

export type FacilityImage = {
  main: Image;
};

export const getFacilityById = async (id: string) => {
  const [tdl, tds] = await Promise.all([
    getFacilities(ParkType.ParkTypeTDL),
    getFacilities(ParkType.ParkTypeTDS),
  ]);

  const facility = [...tdl, ...tds].find((facility) => facility.id === id);
  if (facility) {
    return facility;
  }

  return null;
};
