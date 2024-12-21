export type FacilityId = string;

export type Facility = {
  id: FacilityId;
  name: string;
  operatingStatus: OperatingStatus;
  operatingHour: OperatingHour;
  standbyTime: StandbyTime;
  updatedAt: Date;
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
